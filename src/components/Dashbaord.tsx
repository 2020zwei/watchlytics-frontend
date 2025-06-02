"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";

import { useMarketData, useStats, useBrands, useExpense, useIncome } from "@/hooks/useDashboard";
import { Spinner } from "@heroui/react";
import RoundedBox from "@/components/common/baseButton/RoundedBox";
import Heading from "@/components/common/heading";
import Pagination from "@/components/common/Pagination";
import SelectWidget from "@/components/common/SelectWidget";
import Icon from "@/components/common/Icon";
import clsx from "clsx";
import Notfound from "@/components/common/Notfound";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DASHBOARD_EXPENSE } from "@/types";
import SearchBar from "./common/SearchBar";

const pieData = [
  { name: "Target", value: 25, color: "#1F79B5" },
  { name: "Income", value: 40, color: "#E0E0E0" },
  { name: "Pending", value: 35, color: "#0D3C61" },
];
export default function Dashboard() {
  const initialLoad = useRef<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialPage = Number(searchParams.get("page") || "1");

  const [expense, setExpense] = useState<DASHBOARD_EXPENSE[]>([]);
  const [income, setIncome] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialBrand || initialSearch);
  const [inputSearch, setInputSearch] = useState(initialSearch || initialBrand);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
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
  const { data: expenseData, isLoading: expenseLoading } = useExpense();
  const { data: incomeData, isLoading: incomeLoading } = useIncome();

  const updateFilters = (
    newParams: Record<string, any>,
    options?: { reset?: boolean; includePage?: boolean }
  ) => {
    // initialLoad.current = 1;
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


  const handleSort = (sourceKey: string, direction: 'asc' | 'desc') => {
    if (!market_data?.results) return;

    const sorted = [...market_data.results].sort((a, b) => {
      const aPrice = a?.sources?.[sourceKey]?.price || 0;
      const bPrice = b?.sources?.[sourceKey]?.price || 0;

      return direction === 'asc' ? aPrice - bPrice : bPrice - aPrice;
    });

    setSortConfig({ key: sourceKey, direction });
    setSortedData(sorted);
  };

  const toggleSort = (sourceKey: string) => {
    const newOrder = sortConfig?.key === sourceKey && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    handleSort(sourceKey, newOrder);
  };



  const handleBrandFilter = (query: string, key = "brand") => {
    const formatted = query?.replace(/\s+/g, "No Data");
    updateFilters({ [key]: formatted, page: 1 }, { reset: true, includePage: false });
  };

  const debouncedSearch = useCallback(
    _.debounce((value: string) => {
      const formatted = value?.replace(/\s+/g, "No Data");
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

  useEffect(() => {
    setSortConfig(null);
    setSortedData([]);
  }, [marketData]);

  useEffect(() => {
    if (incomeData?.status === 200) {
      const data = [
        { name: "Target", value: incomeData?.data?.target, color: "#1F79B5" },
        { name: "Income", value: incomeData?.data?.income, color: "#E0E0E0" },
        { name: "Pending", value: incomeData?.data?.pending, color: "#0D3C61" },
      ];
      setIncome(data);
    }
  }, [incomeData])
  useEffect(() => {
    if (expenseData?.status === 200) {
      const data = expenseData?.data?.map((item: { month: string, sales: number, purchases: number }) => ({ month: item?.month, sales: item?.sales, purchase: item?.purchases }))
      setExpense(data);
    }
  }, [expenseData])


  if ((statsLoading || marketDataLoading || brandLoading || incomeLoading || expenseLoading) && !initialLoad.current) {
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
          <Link href="/inventory" className=" rounded-lg bg-white shadow-lg p-4 border-blue-700 border-t-2">
            <div className="text-lg font-medium pb-3 text-blue-700">Manage in Stock</div>
            <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
              {stats?.data?.manage_in_stock}
            </div>
          </Link>
          <Link href="/transaction" className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-red-600">
            <div className="text-lg font-medium pb-3 text-red-600">Sold</div>
            <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none flex items-center gap-1">
              <span className="text-gray-180">$</span>
              <span>{stats?.data?.sold_amount}</span>
            </div>
          </Link>
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

      <div className="flex gap-4 mt-6 md:flex-row flex-col">

        <RoundedBox className="flex-1 py-4 h-[430px] pe-5 overflow-y-auto">
          <div className="px-4 pb-3 flex items-center justify-between">
            <div>
              <Heading>Expense Tracking</Heading>
              <div className="text-sm font-semibold text-dark-800">Payments</div>
            </div>
            <div className="flex gap-4 text-sm font-medium">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#EB2F96]" />
                <span>Sales</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#52C41A]" />
                <span>Purchase</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div
              className="h-[320px]"
              style={{
                width: expense.length > 6 ? `${expense.length * 100}px` : '100%',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={expense}
                  margin={{ top: 10, right: 0, left: 0, bottom: 90 }}
                >
                  <CartesianGrid vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    padding={{ right: 10, left: 30 }}
                    tickMargin={40}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    domain={([dataMin, dataMax]) => {
                      if (dataMin === dataMax) {
                        return [0, dataMax + 10000];
                      }
                      return [Math.max(0, dataMin - 10000), dataMax];
                    }}
                  />
                  <Tooltip
                    formatter={(value: any) => new Intl.NumberFormat().format(value)}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#EB2F96"
                    dot={{ r: 3 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="purchase"
                    stroke="#52C41A"
                    dot={{ r: 3 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </RoundedBox>

        <RoundedBox className="pt-5 px-4 max-h-[430px] lg:min-w-[270px] flex flex-col justify-between pb-4">
          <Heading>Income</Heading>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{ top: 0 }}>
              <Pie
                data={income}
                innerRadius={40}
                outerRadius={70}
                paddingAngle={0}
                cornerRadius={5}
                dataKey="value"
              >
                {income?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-between w-full text-sm border-t pt-10 border-[#AEAEAE80]">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </RoundedBox>
      </div>

      <RoundedBox className="mt-5">
        <div className="flex items-center sm:justify-between justify-start px-5 sm:flex-row flex-col py-5">
          <div className='sm:w-auto w-full'>
            <Heading>Market Comparison</Heading>
          </div>
          <div className="flex items-center sm:mb-0 mb-5 sm:mt-0 mt-3 sm:w-auto w-full xs:flex-row flex-col gap-3">
            <div className='sm:min-w-[320px] w-full flex items-center border rounded-lg placeholder: flex-1 ps-3 border-[#F0F1F3] font-normal'>
              <SearchBar placeholder='Search product, supplier, order' icon='search'
                inputClass='order-1 !h-[38px] !text-xs'
                placeholderClass='placeholder:text-[#858D9D] placeholder:text-xs'
                onChange={(value) => {
                  setMarketParams({
                    ...searchParams,
                    search: value
                  });
                  initialLoad.current = 1
                }}
              />
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
                    <span className="px-1 cursor-pointer" onClick={() => toggleSort('ebay')}>
                      {sortConfig?.key === 'ebay' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    <span className="px-4">up/down %</span>
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    Chrono24
                    <span className="px-1 cursor-pointer" onClick={() => toggleSort('chrono24')}>
                      {sortConfig?.key === 'chrono24' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>

                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    <span className="px-4">up/down %</span>
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    Bezel
                    <span className="px-1 cursor-pointer" onClick={() => toggleSort('bezel')}>
                      {sortConfig?.key === 'bezel' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    <span className="px-4">up/down %</span>
                  </th>
                  <th className='text-end px-4 whitespace-nowrap'>
                    Grailzee
                    <span className="px-1 cursor-pointer" onClick={() => toggleSort('grailzee')}>
                      {sortConfig?.key === 'grailzee' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  </th>
                  <th className='text-start px-4 whitespace-nowrap'>
                    <span className="px-4">up/down %</span>
                  </th>
                  <th className='text-end px-4 last:rounded-e-lg whitespace-nowrap'>
                    Last Updated
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                  (sortConfig ? sortedData : market_data?.results)?.map((item: any, index: number) => (
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
                        {item?.buying_price ? formatCurrency(item?.buying_price, 'en-US', 'USD') : "No Data"}
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">
                          {item?.sources?.ebay?.price && <span className={item?.sources?.ebay?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.ebay?.price > item?.buying_price ? "" : "red"} /></span>}
                          <div className="flex items-center">
                            {item?.sources?.ebay?.price ? formatCurrency(item?.sources?.ebay?.price, 'en-US', 'USD') : "No Data"}
                          </div>
                        </div>
                      </td>
                      <td className=' text-center py-3 px-4'>
                        <>
                          {item?.sources?.ebay?.price_diff_percent ?
                            <div className="flex items-center px-4 whitespace-nowrap">
                              <span className={item?.sources?.ebay?.price > item?.buying_price ? "" : "rotate-180"}>
                                <Icon name="arrow" stroke={item?.sources?.ebay?.price > item?.buying_price ? "" : "red"} /></span>
                              <span>${item?.sources?.ebay?.price_diff_percent} %</span></div> : "No Data"}
                        </>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">
                          {item?.sources?.chrono24?.price &&
                            <span className={item?.sources?.chrono24?.price > item?.buying_price ? "" : "rotate-180"}>
                              <Icon name="arrow" stroke={item?.sources?.chrono24?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.chrono24?.price ? formatCurrency(item?.sources?.chrono24?.price, 'en-US', 'USD') : "No Data"}

                        </div>
                      </td>
                      <td className=' text-center py-3 px-4'>
                        <>
                          {item?.sources?.chrono24?.price_diff_percent ?
                            <div className="flex items-center px-4 whitespace-nowrap">
                              <span className={item?.sources?.chrono24?.price > item?.buying_price ? "" : "rotate-180"}>
                                <Icon name="arrow" stroke={item?.sources?.chrono24?.price > item?.buying_price ? "" : "red"} /></span>
                              <span>${item?.sources?.chrono24?.price_diff_percent} %</span></div> : "No Data"}
                        </>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">
                          {item?.sources?.bezel?.price && <span className={item?.sources?.bezel?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.bezel?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.bezel?.price ? formatCurrency(item?.sources?.bezel?.price, 'en-US', 'USD') : "No Data"}

                        </div>
                      </td>
                      <td className=' text-center py-3 px-4'>
                        <>
                          {item?.sources?.bezel?.price_diff_percent ?
                            <div className="flex items-center px-4 whitespace-nowrap">
                              <span className={item?.sources?.bezel?.price > item?.buying_price ? "" : "rotate-180"}>
                                <Icon name="arrow" stroke={item?.sources?.bezel?.price > item?.buying_price ? "" : "red"} /></span>
                              <span>${item?.sources?.bezel?.price_diff_percent} %</span></div> : "No Data"}
                        </>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center justify-end">
                          {item?.sources?.grailzee?.price && <span className={item?.sources?.grailzee?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.grailzee?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.grailzee?.price ? formatCurrency(item?.sources?.grailzee?.price, 'en-US', 'USD') : "No Data"}
                        </div>
                      </td>
                      <td className=' text-center py-3 px-4'>
                        <>
                          {item?.sources?.grailzee?.price_diff_percent ?
                            <div className="flex items-center px-4 whitespace-nowrap">
                              <span className={item?.sources?.grailzee?.price > item?.buying_price ? "" : "rotate-180"}>
                                <Icon name="arrow" stroke={item?.sources?.grailzee?.price > item?.buying_price ? "" : "red"} /></span>
                              <span>${item?.sources?.grailzee?.price_diff_percent} %</span></div> : "No Data"}
                        </>
                      </td>
                      <td className='py-3 px-4 text-center'>{item?.last_updated || "No Data"}</td>
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
