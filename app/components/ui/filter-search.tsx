
'use client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Icons } from './icons';
import '../../styles/components/filter-search.scss'
import { motion } from 'motion/react';
import Input from './input';

export type filterType = "text" | "select" | "date"
type FilterSearchProps = {
  columnDetails: {
    id: string, 
    name: string, 
    filterType: filterType, 
    selectOptions?: {
      id: string, 
      name: string, 
      value: string}
    }} 

export const FilterSearch = ({columnDetails }: FilterSearchProps) => {
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
        {/* input feild */}
      <div className="">
        <label className='filter-popover__label' htmlFor={columnDetails.id}>{columnDetails.name}</label>
        <Input className='filter-popover__input' placeholder='Select' />
      </div>

    
          <div className="filter-popover__buttons">
            <button className='filter-popover__reset-button'>reset</button>
            <button className='filter-popover__filter-button'>filter</button>
          </div>
      </motion.div>
      </PopoverPanel>
    </Popover>
  )
}