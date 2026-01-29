"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Icons } from "./icons";
import "../../styles/components/filter-search.scss";
import { motion } from "motion/react";
import Input from "./input";
import useFilter from "@/app/hooks/useFilter";
import { useState } from "react";

export type filterType = "text" | "select" | "date";
type FilterSearchProps = {
  columnDetails: {
    id: string;
    name: string;
    filterType: filterType;
    selectOptions?: {
      id: string;
      name: string;
      value: string;
    }[];
  };
};

export const FilterSearch = ({ columnDetails }: FilterSearchProps) => {
  const { applyFilter, clearFilter } = useFilter();
  const [filterValue, setFilterValue] = useState("");
  return (
    <Popover className="filter-popover">
      {({ close }) => (
        <>
          <PopoverButton aria-label="filter button">
            <Icons.filter />
          </PopoverButton>
          <PopoverPanel anchor="bottom" className="filter-popover__first-panel">
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="filter-popover__panel"
            >
              <div>
                <label
                  className="filter-popover__label"
                  htmlFor={columnDetails.id}
                >
                  {columnDetails.name}
                </label>

                {columnDetails.filterType === "text" ? (
                  <Input
                    id={columnDetails.id}
                    name={columnDetails.id}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="filter-popover__input"
                    placeholder={columnDetails.name}
                  />
                ) : columnDetails.filterType === "select" ? (
                  <select
                    id={columnDetails.id}
                    name={columnDetails.id}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="filter-popover__select"
                  >
                    <option hidden>Select</option>
                    {columnDetails.selectOptions?.map((option) => (
                      <option
                        key={option.id}
                        value={option.value}
                        id={option.id}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={columnDetails.id}
                    name={columnDetails.id}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="filter-popover__input"
                    placeholder={columnDetails.name}
                    type="date"
                  />
                )}
              </div>

              <div className="filter-popover__buttons">
                <button
                  aria-label={`reset ${columnDetails.name}`}
                  className="filter-popover__reset-button"
                  onClick={() => {
                    clearFilter(columnDetails.id);
                    close(); // <-- closes the popover
                  }}
                >
                  reset
                </button>

                <button
                  disabled={!filterValue}
                  aria-label={`filter ${columnDetails.name}`}
                  className="filter-popover__filter-button"
                  onClick={() => {
                    if (filterValue) {
                      applyFilter({
                        key: columnDetails.id,
                        value: filterValue,
                      });
                      setFilterValue("");
                      close();
                    }
                  }}
                >
                  filter
                </button>
              </div>
            </motion.div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
