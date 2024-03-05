/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react'

interface PaginationHookProps<T> {
  fetchData: (page: number, pageSize: number) => Promise<T[]>
  initialPage?: number
  initialPageSize?: number
}

interface PaginationHookResult<T> {
  data: T[]
  setData: (data: T[]) => void
  currentPage: number
  totalPages: number
  pageSize: number
  loading: boolean
  goToPage: (page: number) => void
  setPageSize: (size: number) => void
}

function usePagination<T>({
  fetchData,
  initialPage = 1,
  initialPageSize = 10,
}: PaginationHookProps<T>): PaginationHookResult<T> {
  const [data, setData] = useState<T[]>([])
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [loading, setLoading] = useState(false)

  const fetchPageData = async () => {
    setLoading(true)
    try {
      const result = await fetchData(currentPage, pageSize)
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const totalCount = await fetchData(1, 1)
        setTotalPages(Math.ceil(totalCount.length / pageSize))
      } catch (error) {
        console.error('Error fetching total pages:', error)
      }
    }

    fetchTotalPages()
  }, [fetchData, pageSize])

  useEffect(() => {
    fetchPageData()
  }, [currentPage, pageSize, fetchData])

  return {
    data,
    setData,
    currentPage,
    totalPages,
    pageSize,
    loading,
    goToPage,
    setPageSize,
  }
}

export default usePagination
