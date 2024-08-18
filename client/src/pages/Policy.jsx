import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
       <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacypolicy.png"
            alt="contactus"
            style={{ height:"350px", marginLeft:"150px" }}
          />
        </div>
        <div className="col-md-4">
          <h2 className="bg-dark p-2 text-white text-center mb-4">Our Policy</h2>
          <p className="text-justify">At ShopEase, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to safeguard your data.</p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
