import React from "react";
import Skeleton from "@mui/material/Skeleton";
import './loading-shadow.styles.scss'
const LoadingShadow = () =>(
    <div className="loading-container">
        <div className="skeleton-container">
            <Skeleton height={70} sx={{ bgcolor: 'grey.800' }}/>
            <Skeleton height={70} sx={{ bgcolor: 'grey.800' }}/>
            <Skeleton height={70} sx={{ bgcolor: 'grey.800' }}/>
            <Skeleton height={70} sx={{ bgcolor: 'grey.800' }}/>

        </div>
  </div>
);

export default LoadingShadow;