"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";

import {useMarketData, useStats, useBrands } from "@/hooks/useDashboard";
import { Spinner } from "@heroui/react";
import RoundedBox from "@/components/common/baseButton/RoundedBox";
import Heading from "@/components/common/heading";
import Pagination from "@/components/common/Pagination";
import SelectWidget from "@/components/common/SelectWidget";
import Icon from "@/components/common/Icon";
import clsx from "clsx";
import Notfound from "@/components/common/Notfound";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialPage = Number(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialBrand || initialSearch);
  const [inputSearch, setInputSearch] = useState(initialSearch || initialBrand);
  const [marketParams, setMarketParams] = useState<Record<string, any>>(() => {
    const params: Record<string, any> = {};
    if (initialBrand) params.brand = initialBrand;
    if (initialSearch) params.search = initialSearch;
    if (initialPage) params.page = initialPage;
    return params;
  });

  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: brands, isLoading: brandLoading } = useBrands();
  const { data: marketData, isLoading: marketDataLoading } = useMarketData(marketParams);

  const updateFilters = (
    newParams: Record<string, any>,
    options?: { reset?: boolean; includePage?: boolean }
  ) => {
    const pageSize = 20;
    setInputSearch("");

    const { reset = false, includePage = true } = options || {};

    const apiParams: Record<string, any> = {
      ...newParams,
      page_size: pageSize,
    };

    if (includePage && !newParams.page) {
      apiParams.page = 1;
    }

    const uiParams = { ...newParams };
    if (!includePage) {
      delete uiParams.page;
    }

    setMarketParams(apiParams);
    setSearchQuery(uiParams?.brand || "");
    setInputSearch(uiParams?.brand || "");
    setCurrentPage(Number(uiParams?.page || 1));

    const query = new URLSearchParams();
    Object.entries(uiParams).forEach(([key, value]) => {
      if (value) query.set(key, value.toString());
    });

    router.replace(`/dashboard?${query.toString()}`, { scroll: false });
  };



  const handleBrandFilter = (query: string, key = "brand") => {
    const formatted = query?.replace(/\s+/g, "-");
    updateFilters({ [key]: formatted, page: 1 }, { reset: true, includePage: false });
  };

  const debouncedSearch = useCallback(
    _.debounce((value: string) => {
      const formatted = value?.replace(/\s+/g, "-");
      updateFilters({ search: formatted }, { reset: true, includePage: false });
    }, 500),
    []
  );



  useEffect(() => {
    const brand = searchParams.get("brand") || "";
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || "1");
    setInputSearch(search || "");
    setCurrentPage(page);
  }, [searchParams]);

  if (statsLoading || marketDataLoading || brandLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  const market_data = marketData?.data;

  return (
    <>
      <RoundedBox className="p-4 pb-5">
        <Heading>Stock Tracking</Heading>
        <div className=" grid md:grid-cols-4 xs:grid-cols-2 grid-cols-1 mt-6 gap-3">
          <div className=" rounded-lg bg-white shadow-lg p-4 border-blue-700 border-t-2">
            <div className="text-lg font-medium pb-3 text-blue-700">Manage in Stock</div>
            <select name="" id="" className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
              <option value="868" className="">{stats?.data?.manage_in_stock}</option>
            </select>
          </div>
          <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-red-600">
            <div className="text-lg font-medium pb-3 text-red-600">Sold</div>
            <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none flex items-center gap-1">
              <span className="text-gray-180">$</span>
              <span>{stats?.data?.sold_amount}</span>
            </div>
          </div>
          <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-orange-600">
            <div className="text-lg font-medium pb-3 text-orange-600">Pending Sale</div>
            <select name="" id="" className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
              <option value="868" className="">{stats?.data?.pending_sale}</option>
            </select>
          </div>
          <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-green-600">
            <div className="text-lg font-medium pb-3 text-green-600">Total Orders</div>
            <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none flex items-center gap-1">
              {stats?.data?.total_orders}
            </div>
          </div>
        </div>
      </RoundedBox>

      {/* -------------------------------------- market data -------------------------------------------*/}

      <RoundedBox className="mt-5">
        <div className="flex items-center sm:justify-between justify-start px-5 sm:flex-row flex-col py-5">
          <div className='sm:w-auto w-full'>
            <Heading>Market Comparison</Heading>
          </div>
          <div className="flex items-center sm:mb-0 mb-5 sm:mt-0 mt-3 sm:w-auto w-full xs:flex-row flex-col gap-3">
            <div className='sm:min-w-[320px] w-full flex items-center border rounded-lg placeholder: flex-1 ps-3 border-[#F0F1F3] font-normal'>
              <>
                <input value={inputSearch} onChange={(e) => { setInputSearch(e.target.value); debouncedSearch(e.target.value) }} type="text" className={clsx("border-0 placeholder:text-[#858D9D] order-1 !h-10 placeholder:text-xs focus:outline-none px-3 w-full bg-transparent")} placeholder="" />
                <span><Icon name="search" size="1.3rem" className={clsx("ms-2")} /></span>
              </>
            </div>
            <div className="xs:w-[167px] w-full">
              <SelectWidget
                options={brands?.data?.results?.map((item: any) => item.name)}
                onValueChange={(value) => handleBrandFilter(value, "brand")}
                selected={marketParams.brand?.replaceAll("-", " ") || ""}
                classNames={{
                  trigger: "!rounded-lg bg-transparent border !border-gray-[#F0F1F3] text-[#858D9D] font-normal text-sm",
                  base: "rounded-none",
                  popoverContent: "rounded-none",
                }}
              />

            </div>
          </div>
        </div>
        <div className='overflow-x-auto'>
          {marketData === undefined ? <Notfound label={`No records found ${searchQuery}`} /> :
            <table className='w-full'>
              <thead className='h-12'>
                <tr className='text-white text-sm font-medium bg-blue-gradient'>
                  <th className='text-start px-4 first:rounded-s-lg  overflow-hidden'>
                    Image
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    Reference Number
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    Buying Price
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    ebay
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    Chrono24
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    Bezel
                  </th>
                  <th className='text-end px-4 last:rounded-e-lg whitespace-nowrap'>
                    Grailzee
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                  market_data?.results?.map((item: any, index: number) => (
                    <tr key={index} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                      <td className="px-4">
                        <RoundedBox className="relative items-center justify-center flex  my-2 !bg-gray-80 p-2 h-14 w-14">
                          {item?.image_url ? <img src={item?.image_url} width={48} alt="image" className='w-full h-full rounded-md' /> : "N/A"}
                        </RoundedBox>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">{item?.reference_number}</div>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        {item?.buying_price ? formatCurrency(item?.buying_price, 'en-US', 'USD') : "-"}
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">
                          {item?.sources?.ebay?.price && <span className={item?.sources?.ebay?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.ebay?.price > item?.buying_price ? "" : "red"} /></span>}
                          <div className="flex items-center">
                            {item?.sources?.ebay?.price ? formatCurrency(item?.sources?.ebay?.price, 'en-US', 'USD') : "-"}
                          </div>
                        </div>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">
                          {item?.sources?.chrono24?.price && <span className={item?.sources?.chrono24?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.chrono24?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.chrono24?.price ? formatCurrency(item?.sources?.chrono24?.price, 'en-US', 'USD') : "-"}
                        </div>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">
                          {item?.sources?.bezel?.price && <span className={item?.sources?.bezel?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.bezel?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.bezel?.price ? formatCurrency(item?.sources?.bezel?.price, 'en-US', 'USD') : "-"}
                        </div>
                      </td>
                      <td className=' text-end py-3 px-4'>
                        <div className="flex items-center justify-end">
                          {item?.sources?.grailzee?.price && <span className={item?.sources?.grailzee?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.grailzee?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.grailzee?.price ? formatCurrency(item?.sources?.grailzee?.price, 'en-US', 'USD') : "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>}
        </div>
        {market_data?.count > 20 &&
          <div className="px-4 pb-5">
            <Pagination
              totalPages={Math.ceil(market_data?.count / 20)}
              currentPage={currentPage}
              onPageChange={(page) => {
                updateFilters({ ...marketParams, page });
              }}
            />
          </div>}
      </RoundedBox>

      {/* -------------------------------------- end market data -------------------------------------------*/}

    </>
  )
}
