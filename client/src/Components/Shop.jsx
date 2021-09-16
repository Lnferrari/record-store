import React, { useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { getRecords } from '../helpers/apiCalls'
import Record from './Record'

const Shop = () => {
  const {records, setRecords} = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
      const records = await getRecords();
      setRecords(records);
    };
    getData();
  }, [setRecords])

  const recordsList = records.map(item => (
    <Record data={item} key={item._id} />
  ))

  return (
    <section className='page-wrapper' id='shop-grid'>
      {recordsList}
    </section>
  )
}

export default Shop
