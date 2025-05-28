"use client"
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { DASHBOARD_EXPENSE, DASHBOARD_INCOME, DASHBOARD_STATS, MARKETDATA, RequestTypes } from "@/types";
import { sendRequest } from "@/utils/apis";
import _ from 'lodash';

import { METHODS, URLS } from "@/utils/constants";
import { Spinner } from "@heroui/react";
import RoundedBox from "@/components/common/baseButton/RoundedBox";
import Heading from "@/components/common/heading";
import SelectWidget from "@/components/common/SelectWidget";
import Pagination from "@/components/common/Pagination";
import Icon from "@/components/common/Icon";
import { useRouter } from "next/navigation";
import Notfound from "@/components/common/Notfound";
import clsx from "clsx";
import { formatCurrency } from "@/utils/formatCurrency";


const pieData = [
  { name: "Target", value: 25, color: "#1F79B5" },
  { name: "Income", value: 40, color: "#E0E0E0" },
  { name: "Pending", value: 35, color: "#0D3C61" },
];

export default function ExpenseTrackingChart() {
  const [brands, setBrands] = useState<string[]>([]);
  const [stats, setStats] = useState<DASHBOARD_STATS>();
  const [expense, setExpense] = useState<DASHBOARD_EXPENSE[]>([]);
  const [income, setIncome] = useState<DASHBOARD_INCOME[]>([]);
  const [marketData, setMarketData] = useState<{ count: number; results: MARKETDATA[] }>({ count: 0, results: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const router = useRouter();

  const pageRef = useRef(null)

  const fetchMarketData = async (query: string) => {
    setLoading(true);
    const PAYLOAD: RequestTypes = {
      url: `${URLS.MARKET_COMPARISON}?${query}`,
      method: METHODS.GET,
    };
    sendRequest(PAYLOAD).then((res) => {
      if (res.status === 200) {
        setMarketData({
          count: res.data?.count || 0,
          results: res.data?.results || [],
        });
      }
    }).finally(() => setLoading(false));
  };

  const fetchStats = async () => {
    const PAYLOAD: RequestTypes = {
      url: URLS.DASHBOARD_STATS,
      method: METHODS.GET,
    };
    sendRequest(PAYLOAD).then((res) => {
      if (res.status === 200) {
        setStats(res?.data);
      }
    });
  };

  const fetchExpense = async () => {
    const PAYLOAD: RequestTypes = {
      url: URLS.DASHBOARD_EXPENSE_TRACKING,
      method: METHODS.GET,
    };
    sendRequest(PAYLOAD).then((res) => {
      if (res.status === 200) {
        setExpense(res?.data);
      }
    });
  };

  const fetchIncome = async () => {
    const PAYLOAD: RequestTypes = {
      url: URLS.DASHBOARD_INCOME_BREAKDONW,
      method: METHODS.GET,
    };
    sendRequest(PAYLOAD).then((res) => {
      if (res.status === 200) {
        const data = [
          { name: "Target", value: res?.data?.target, color: "#1F79B5" },
          { name: "Income", value: res?.data?.income, color: "#E0E0E0" },
          { name: "Pending", value: res?.data?.pending, color: "#0D3C61" },
        ];
        setIncome(data);
      }
    });
  };

  const fetchBrands = async () => {
    const PAYLOAD: RequestTypes = {
      url: URLS.CATEGORES,
      method: METHODS.GET,
    };
    sendRequest(PAYLOAD).then((res) => {
      if (res.status === 200) {
        const options = res?.data?.results?.map((item: any) => item.name);
        setBrands(options);
      }
    });
  };

  const queryGenerator = (q = "") => {
    const urlSearchParams = new URLSearchParams(window?.location?.search);
    const key = urlSearchParams.get("brand") ? "brand" : "search"
    const queryParam = key == "brand" ? urlSearchParams.get(key) : urlSearchParams.get(key);
    const pageParam = parseInt(urlSearchParams.get("page") || "1", 10);
    const parsedQuery = queryParam ? queryParam.replace(/\s+/g, "-") : "";
    const squery = q || parsedQuery ? `${key}=${q || parsedQuery}` : "";

    const page = currentPage > 1 ? currentPage : pageParam > 1 ? pageParam : null;
    const pquery = page ? `page=${page}&page_size=20` : "";
    pageRef.current = pageParam
    const combinedQuery = [squery, pquery].filter(Boolean).join("&");
    const url = `/dashboard/?${combinedQuery}`;
    router.push(url);
    setSearchQuery(parsedQuery?.replace("-", " "));
    if (key === "search") {
      setInputSearch(queryParam)
    }
    return combinedQuery;
  };


  const handleBrandFilter = (query: string, key = "brand") => {
    setCurrentPage(1)
    pageRef.current = 1
    const url = `/dashboard/?${key}=${query?.replace(/\s+/g, "-")}`;
    router.push(url);
    fetchMarketData(`${key}=${query?.replace(/\s+/g, "-")}`);
  };

  const debouncedSearch = useCallback(
    _.debounce((value) => {
      console.log('Searching for:', value);
      handleBrandFilter(value, "search")
    }, 500),
    []
  );


  useEffect(() => {
    const url = queryGenerator()
    fetchMarketData(url);

  }, [currentPage]);


  useEffect(() => {
    fetchBrands();
    fetchStats();
    fetchExpense();
    fetchIncome();
  }, []);


  if (loading) {
    return <div className='text-center'><Spinner /></div>;
  }

  return (
    <>
      <RoundedBox className="p-4 pb-5">
        <Heading>Stock Tracking</Heading>
        <div className=" grid md:grid-cols-4 xs:grid-cols-2 grid-cols-1 mt-6 gap-3">
          <div className=" rounded-lg bg-white shadow-lg p-4 border-blue-700 border-t-2">
            <div className="text-lg font-medium pb-3 text-blue-700">Manage in Stock</div>
            <select name="" id="" className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
              <option value="868" className="">{stats?.manage_in_stock}</option>
            </select>
          </div>
          <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-red-600">
            <div className="text-lg font-medium pb-3 text-red-600">Sold</div>
            <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none flex items-center gap-1">
              <span className="text-gray-180">$</span>
              <span>{stats?.sold_amount}</span>
            </div>
          </div>
          <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-orange-600">
            <div className="text-lg font-medium pb-3 text-orange-600">Pending Sale</div>
            <select name="" id="" className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none">
              <option value="868" className="">{stats?.pending_sale}</option>
            </select>
          </div>
          <div className=" rounded-lg bg-white shadow-lg p-4 border-t-2 border-green-600">
            <div className="text-lg font-medium pb-3 text-green-600">Total Orders</div>
            <div className="font-bold text-2xl text-dark-800 min-w-[70px] outline-none flex items-center gap-1">
              {stats?.total_orders}
            </div>
          </div>
        </div>
      </RoundedBox>
      <div className="flex gap-4 mt-6 md:flex-row flex-col">
        <RoundedBox className="flex-1 py-4 h-[430px] pe-5">
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={expense} margin={{ top: 10, right: 0, left: 0, bottom: 90 }}>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} padding={{ right: 10, left: 30 }} tickMargin={40} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false}
                domain={([dataMin, dataMax]) => {
                  if (dataMin === dataMax) {
                    return [0, dataMax + 10000];
                  }
                  return [Math.max(0, dataMin - 10000), dataMax];
                }}

              />
              <Tooltip formatter={(value: any) => new Intl.NumberFormat().format(value)} />
              <Line type="monotone" dataKey="sales" stroke="#EB2F96" dot={{ r: 3 }} strokeWidth={2} />
              <Line type="monotone" dataKey="purchase" stroke="#52C41A" dot={{ r: 3 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </RoundedBox>
        <RoundedBox className="pt-5 px-4 max-h-[430px] lg:w-[270px] flex flex-col justify-between pb-4">
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
              <>
                <input value={inputSearch} onChange={(e) => { setInputSearch(e.target.value); debouncedSearch(e.target.value) }} type="text" className={clsx("border-0 placeholder:text-[#858D9D] order-1 !h-10 placeholder:text-xs focus:outline-none px-3 w-full bg-transparent")} placeholder="" />
                <span><Icon name="search" size="1.3rem" className={clsx("ms-2")} /></span>
              </>
            </div>
            <div className="xs:w-[167px] w-full">
              <SelectWidget
                options={brands}
                onValueChange={handleBrandFilter}
                selected={searchQuery}
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
          {!marketData?.results?.length ? <Notfound label={`No records found ${searchQuery}`} /> :
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
                  marketData?.results?.map((item, index) => (
                    <tr key={index} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                      <td className="px-4">
                        <RoundedBox className="relative items-center justify-center flex  my-2 !bg-gray-80 p-2 h-14 w-14">
                          {item?.image_url ? <img src={item?.image_url} width={48} alt="image" className='w-full h-full rounded-md' /> : "N/A"}
                        </RoundedBox>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">547975949754</div>
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
                            {/* {item?.sources?.ebay?.price ? <> <Icon name="doller" size="1rem" />{item?.sources?.ebay?.price?.toFixed(2)}</> : "-"} */}
                          </div>
                        </div>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">
                          {item?.sources?.chrono24?.price && <span className={item?.sources?.chrono24?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.chrono24?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.chrono24?.price ? <> <Icon name="doller" size="1rem" />{item?.sources?.chrono24?.price?.toFixed(2)}</> : "-"}
                        </div>
                      </td>
                      <td className=' text-start py-3 px-4'>
                        <div className="flex items-center">
                          {item?.sources?.bezel?.price && <span className={item?.sources?.bezel?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.bezel?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.bezel?.price ? <> <Icon name="doller" size="1rem" />{item?.sources?.bezel?.price?.toFixed(2)}</> : "-"}
                        </div>
                      </td>
                      <td className=' text-end py-3 px-4'>
                        <div className="flex items-center justify-end">
                          {item?.sources?.grailzee?.price && <span className={item?.sources?.grailzee?.price > item?.buying_price ? "" : "rotate-180"}>
                            <Icon name="arrow" stroke={item?.sources?.grailzee?.price > item?.buying_price ? "" : "red"} /></span>}
                          {item?.sources?.grailzee?.price ? <> <Icon name="doller" size="1rem" />{item?.sources?.grailzee?.price?.toFixed(2)}</> : "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>}
        </div>
        {marketData?.count > 20 &&
          <div className="px-4 pb-5">
            <Pagination
              totalPages={Math.ceil(marketData?.count / 20)}
              // @ts-ignore
              currentPage={currentPage > 1 ? currentPage : pageRef?.current}
              onPageChange={(page) => (setCurrentPage(page))}
            />
          </div>}
      </RoundedBox>
    </>
  );
}
