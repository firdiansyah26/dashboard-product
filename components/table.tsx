"use client";

import { useState, useEffect } from "react";

interface parentProps {
  setSearch: (search: string) => void;
}

interface buttonProps {
  setListTemp: (listTemp: any) => void;
  list: Array<[]>;
  totalPage: number;
}

function renderAmount(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price ?? 0);
}

function SearchBox({ setSearch }: parentProps) {
  return (
    <input
      type="text"
      id="first_name"
      onChange={(e) => setSearch(e.target.value)}
      className="bg-gray-50 border w-52 text-black border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      placeholder="Search Product"
    />
  );
}

function TabelComponent({ ...props }) {
  let title = [];

  if (props.currentMenu === "products") {
    title = ["Product Name", "Brand", "Price", "Stock", "Category"];
  } else {
    title = [
      "Product Name",
      "Price",
      "Quantity",
      "Total",
      "Discount",
      "Discount Price",
    ];
  }

  function renderColumn(x: any) {
    if (props.currentMenu === "products") {
      return (
        <>
          <td className="px-6 py-4">{x.title}</td>
          <td className="px-6 py-4">{x.brand}</td>
          <td className="px-6 py-4">{renderAmount(x.price)}</td>
          <td className="px-6 py-4">{x.stock}</td>
          <td className="px-6 py-4">{x.category}</td>
        </>
      );
    } else {
      return (
        <>
          <td className="px-6 py-4">{x.title}</td>
          <td className="px-6 py-4">{x.price}</td>
          <td className="px-6 py-4">{x.quantity}</td>
          <td className="px-6 py-4">{renderAmount(x.total)}</td>
          <td className="px-6 py-4">{x.discountPercentage}</td>
          <td className="px-6 py-4">{x.discountedPrice}</td>
        </>
      );
    }
  }

  return (
    <div>
      {props.currentMenu === "carts" && props.cartDetail ? (
        <div className="flex flex-col gap-3 p-6 bg-slate-300 mb-6">
          <div className="flex flex-row justify-between">
            <h3>Details</h3>
            <button
              className="rounded-none bg-gray-200 p-3 disabled:opacity-25"
              onClick={() => {
                props.setCartDetail({});
                props.setCartId(0);
              }}
            >
              Back
            </button>
          </div>
          <div className="w-full grid grid-cols-[1fr_1fr]">
            <span>User : {props.cartDetail.id}</span>
            <span># of items : {props.cartDetail.totalProducts}</span>
            <span>Added on : 22 Jan 2022</span>
            <span>Total Amount : {renderAmount(props.cartDetail.total)}</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <table className="w-full text-sm text-left text-black dark:text-gray-400">
        <thead className="text-xs text-black uppercase bg-gray-300">
          <tr>
            {title.map((x: string, idx: number) => {
              return (
                <th key={idx} scope="col" className="px-6 py-3">
                  {x}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.list?.map(
            (
              x: {
                title: string;
                brand: string;
                price: number;
                stock: number;
                category: string;
              },
              i: number
            ) => {
              return (
                <tr key={i} className="border-b bg-gray-100 text-black">
                  {renderColumn(x)}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

function TabelCartComponent({ ...props }) {
  return (
    <table className="w-full text-sm text-left text-black dark:text-gray-400">
      <thead className="text-xs text-black uppercase bg-gray-300">
        <tr>
          <th scope="col" className="px-6 py-3">
            Cart Id
          </th>
          <th scope="col" className="px-6 py-3">
            Total Product
          </th>
          <th scope="col" className="px-6 py-3">
            Total Quantity
          </th>
          <th scope="col" className="px-6 py-3">
            Discount
          </th>
          <th scope="col" className="px-6 py-3">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {props.list?.map(
          (
            x: {
              total: number;
              discountedTotal: number;
              id: number;
              totalProducts: number;
              totalQuantity: number;
            },
            i: number
          ) => {
            return (
              <tr key={i} className="border-b bg-gray-100 text-black">
                <td className="px-6 py-4">
                  <span
                    className="cursor-pointer underline"
                    onClick={() => props.setCartId(x.id)}
                  >
                    {x.id}
                  </span>
                </td>
                <td className="px-6 py-4">{x.totalProducts}</td>
                <td className="px-6 py-4">{x.totalQuantity}</td>
                <td className="px-6 py-4">{x.discountedTotal}</td>
                <td className="px-6 py-4">{x.total}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}

function ButtonSection({ totalPage, list, setListTemp }: buttonProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setListPerPage();
  }, [currentPage]);

  useEffect(() => {
    setListPerPage();
  }, [list.length]);

  function setListPerPage() {
    const pageSize = 10;
    let result: any[] = [];

    list
      .filter((row: object, index: number) => {
        let start = (currentPage - 1) * pageSize;
        let end = currentPage * pageSize;
        if (index >= start && index < end) return true;
      })
      .forEach((c: any) => {
        result.push(c);
      });

    setListTemp(result);
  }

  return (
    <div className="flex flex-row gap-3 items-center">
      <button
        className="rounded-none bg-gray-200 p-3 disabled:opacity-25"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      <div>
        Page {currentPage} / {totalPage}
      </div>
      <button
        className="rounded-none bg-gray-200 p-3 disabled:opacity-25"
        disabled={currentPage === totalPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

function Tabel({ ...props }) {
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [cartId, setCartId] = useState(0);
  const [cartDetail, setCartDetail] = useState({});
  const [list, setList] = useState([]);
  const [listTemp, setListTemp] = useState([]);

  const fetchDetail = async (id: number) => {
    try {
      const res = await fetch(`https://dummyjson.com/carts/${id}`);
      const result = await res.json();
      const countPage = Math.ceil(result.products.length / 10);

      setList(result.products);
      setCartDetail(result);
      setTotalPage(countPage);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (type: string) => {
    try {
      const baseAPI = `https://dummyjson.com/${props.currentMenu}`;
      let res: any = null;
      let limit = props.currentMenu === "products" ? "limit=100" : "";

      if (type === "init") {
        res = await fetch(`${baseAPI}?${limit}`);
      } else if (search) {
        res = await fetch(`${baseAPI}/search?q=${search}&${limit}`);
      }

      if (res) {
        const result = await res.json();
        const countPage = Math.ceil(result.total / 10);

        setList(result[props.currentMenu]);
        setTotalPage(countPage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("init");
  }, []);

  useEffect(() => {
    if (cartId !== 0) fetchDetail(cartId);
  }, [cartId]);

  useEffect(() => {
    if (Object.keys(cartDetail).length == 0) {
      setListTemp([]);
      setList([]);
      fetchData("init");
    }
  }, [cartDetail]);

  useEffect(() => {
    setCartId(0);
    fetchData("init");
  }, [props.currentMenu]);

  useEffect(() => {
    fetchData("search");
  }, [search]);

  return (
    <div className="flex flex-col items-end gap-6 m-6">
      {props.currentMenu === "products" ? (
        <>
          <SearchBox setSearch={setSearch} />
          <TabelComponent list={listTemp} currentMenu={props.currentMenu} />
        </>
      ) : (
        ""
      )}

      {props.currentMenu === "carts" ? (
        cartId === 0 ? (
          <TabelCartComponent list={listTemp} setCartId={setCartId} />
        ) : (
          <TabelComponent
            list={listTemp}
            currentMenu={props.currentMenu}
            cartDetail={cartDetail}
            setCartId={setCartId}
            setCartDetail={setCartDetail}
          />
        )
      ) : (
        ""
      )}

      <ButtonSection
        totalPage={totalPage}
        list={list}
        setListTemp={setListTemp}
      />
    </div>
  );
}

export default Tabel;
