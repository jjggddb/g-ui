<template>
  <view class="content">
    <g-table
      border
      stripe
      :loading="loading"
      :columns="columns"
      :data="dataList"
      :pagination="pagination"
      @pageChange="pageChange" >
      <template slot-scope="{value, row, index, col}">
        <text>{{ index }}</text>
        <text>{{ value }}</text>
        <!-- <text>{{ row }}</text> -->
        <!-- <text>{{ col }}</text> -->
      </template>
      <template slot-scope="{value, row, index, col}">
        <text>{{ index }},</text>
        <text>{{ value }}</text>
        <!-- <text>{{ row }}</text> -->
        <!-- <text>{{ col }}</text> -->
      </template>
    </g-table>
  </view>
</template>

<script>
import {
  data
} from './mock.js'
export default {
  data() {
    return {
      loading: false,
      pagination: {
        total: 0,
        page: 1,
        size: 10
      },
      columns: [{
        title: '动账日期',
        width: '120',
        align: 'center',
        key: 'aaa',
        type: 'number',
        headerStyle: {
          color: 'red'
        },
        cellStyle: {
          color: 'red'
        },
        slot: true
      },
      {
        title: '动账日期22',
        width: '130',
        align: 'center',
        key: 'bbb',
        type: 'price'
      }, {
        title: '动账日期33',
        width: '140',
        align: 'center',
        key: 'ccc',
        type: 'date',
        format: 'YYYY-MM-DD',
        slot: true
      }, {
        title: '动账日期44',
        width: '150',
        align: 'center',
        key: 'ddd',
        type: 'dict'
      }
      ],
      dataList: []
    }
  },
  onLoad() {
    this.pagination.total = data.length
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const {
            page,
            size
          } = this.pagination
          const startIndex = (page - 1) * size
          const endIndex = startIndex + size - 1
          this.dataList = data.slice(startIndex, endIndex)
          this.loading = false
        }, 2000)
      })
    },
    pageChange(e) {
      console.log(e)
      Object.assign(this.pagination, e)
      this.loadData()
    }
  }
}
</script>

<style>
	.content {

	}
</style>
