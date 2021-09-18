import React from 'react'

const Banner = () => {
    return (
        <div className="row banner-parent">
            <div className="col img-thumbnail banner bg-primary">
                <h3>Penjualan</h3>
            </div>
            <div className="col img-thumbnail banner bg-warning">
                <h3>Pembelian</h3>
            </div>
        </div>
    )
}

export default Banner