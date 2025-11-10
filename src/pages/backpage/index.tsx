import React from "react";
import UploadPage from "components/Upload";
import Upload2 from "components/Upload2";
import Head from 'next/head'
import AppHeader from 'components/AppHeader'
export default function index() {
    return (
        <div>
            <Head><title>backpage</title></Head>
      
            <AppHeader title='backpage'></AppHeader>
            <h2>backpage</h2>
            <UploadPage/>
            <Upload2/>
        </div>
    )
}