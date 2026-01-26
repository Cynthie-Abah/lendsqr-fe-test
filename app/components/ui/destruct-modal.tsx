'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'motion/react';
import { Button } from './button';
import '../../styles/components/destruct-modal.scss'

    type DeleteProductModalProps = {
        open: boolean;
        setOpen: (open: boolean) => void;
        action: string;
        destructFunction: () => void;
        isPending: boolean;
    };
  
  export const DestructModal = ({ 
    open, 
    setOpen, 
    action, 
    destructFunction, 
    isPending }: DeleteProductModalProps) => {

        const handleDestruct = ()=> {
            destructFunction()
            
        }

  return (

    <Dialog open={open} as="div" className={'dialogWrapper'} onClose={() => setOpen(false)}>
  {/* Background overlay with blur */}
  <div className={'dialogOverlay'} />

  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 100 }}
    transition={{ duration: 0.3 }}
   className={'dialogContainer'}>
    <DialogPanel className={'dialogPanel'}>
      <DialogTitle className={'dialogTitle'}>
        {action}
      </DialogTitle>

      <div className={'dialogText'}>
        This action cannot be undone.
      </div>

      <div className={'buttonGroup'}>
        <div className="buttons">
          <Button
            className=""
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            No, Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDestruct}
          >
            {isPending ? 'Loading...' : 'Yes, Proceed'}
          </Button>
        </div>
      </div>
    </DialogPanel>
  </motion.div>
</Dialog>
  
  )
}