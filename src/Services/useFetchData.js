import {useState, useEffect } from 'react'

const useFetchData = (func) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        func
        .then(res => {
            setData({
                status: 'ok',
                data: res.data
            })
        })
        .catch(error => setData({
            status: 'error',
            error: error
        })
        )
        .finally(() => setLoading(false))
    },[])
    return {
        data,
        loading
    }
}

export default useFetchData