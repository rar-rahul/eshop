import React from 'react';
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export const CartIcon = () => {
  return (
    <div>

                <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>
                <Link to='/cart'><span>0</span>
                <AddShoppingCartIcon/>
                </Link>
                
              </button>

    </div>
  )
}
