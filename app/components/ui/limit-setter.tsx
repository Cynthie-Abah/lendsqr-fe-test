import Form from 'next/form';
import  { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import '../../styles/components/limit-setter.scss'
import { Table } from '@tanstack/react-table';

const limits = [
  { id: '10', name: '10', value: '10' },
  { id: '25', name: '25', value: '25' },
  { id: '50', name: '50', value: '50' },
  { id: '100', name: '100', value: '100' },
  { id: '250', name: '250', value: '250' },
];

export default function LimitSetter<tData>({ table }: {table: Table<tData>}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const totalRows = table.getPrePaginationRowModel().rows.length

  // fetches the default limit 
  const entries = Array.from(searchParams.entries());
  const defaultLimit = entries
    .map(([key, value]) => ({
      filterKey: key,
      filterValue: value,
    }))
    .find((filter) => filter.filterKey === 'limit');

    // sets the default value to the actual limit value on initial page load 
    useEffect(() => {
      if (defaultLimit !== undefined) {
        table.setPageSize(Number(defaultLimit.filterValue))
      }
    }, []);

// create query string and append to url 
  const createQueryString = useCallback(
    (value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('limit', `${value}`);
      router.push(pathname + '?' + params.toString());
    },
    [searchParams, pathname, router],
  );

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
    table.setPageSize(Number(e.target.value))
    createQueryString(e.target.value)
  }

  return (
    <Form action="" className="limit-setter">
      <label htmlFor="limit" className="limit-setter__label">
        Showing
      </label>

      <select
        id="limit"
        defaultValue={defaultLimit?.filterValue}
        onChange={(e) => handleLimitChange(e)}
        className="limit-setter__select"
      >
        {limits.map((limit) => (
          <option key={limit.id} value={limit.value}>
            {limit.name}
          </option>
        ))}
      </select>

      <span className="limit-setter__suffix"> out of {totalRows}</span>
    </Form>
  );
}
