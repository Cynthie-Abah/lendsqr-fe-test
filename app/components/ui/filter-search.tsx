
'use client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Icons } from './icons';
import '../../styles/components/filter-search.scss'
import { motion } from 'motion/react';
import Input from './input';
import useFilter from '@/app/hooks/useFilter';
import { useState } from 'react';

export type filterType = "text" | "select" | "date"
type FilterSearchProps = {
  columnDetails: {
    id: string, 
    name: string, 
    filterType: filterType, 
    selectOptions?: {
      id: string, 
      name: string, 
      value: string}[]
    }} 

export const FilterSearch = ({columnDetails }: FilterSearchProps) => {
  const {applyFilter, clearFilter} = useFilter();
  const [filterValue, setFilterValue] = useState('');
  return (
    <Popover className="filter-popover">
      <PopoverButton><Icons.filter /></PopoverButton>
      <PopoverPanel anchor="bottom" className={'filter-popover__first-panel'} >
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      className="filter-popover__panel">

      <div className="">
        <label className='filter-popover__label' htmlFor={columnDetails.id}>{columnDetails.name}</label>
        {
          columnDetails.filterType === 'text' ?
          // input field  
          <Input 
          value={filterValue} 
          onChange={(e)=> setFilterValue(e.target.value)} 
          className='filter-popover__input' 
          placeholder='Select' /> :

          columnDetails.filterType === 'select' ? 
          // select field 
          <select 
          value={filterValue} 
          onChange={(e)=> setFilterValue(e.target.value)}
          className='filter-popover__select'>
            <option hidden>Select</option>
            {
              columnDetails.selectOptions && 
              columnDetails.selectOptions.map((option)=> (
                <option key={option.id} value={option.value} id={option.id}>{option.name}</option>
              ))
            }
            
          </select> : 
          // data fields 
          <div className=""></div>
        }
        
      </div>

    
          <div className="filter-popover__buttons">
            <button className='filter-popover__reset-button' onClick={()=> clearFilter(columnDetails.name)}>reset</button>
            <button 
            onClick={()=> applyFilter({key: columnDetails.name, value: filterValue})} 
            className='filter-popover__filter-button'>filter</button>
          </div>
      </motion.div>
      </PopoverPanel>
    </Popover>
  )
}