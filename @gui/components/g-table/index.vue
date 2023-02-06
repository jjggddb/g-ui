<template>
  <scroll-view>
    <view>
      <uni-table
        ref="gTable"
        :loading="innerLoading"
        :data="data"
        stripe
        :empty-text="emptyText"
        @selectionChange="selectionChange">
        <uni-tr>
          <uni-th v-for="(th, thIndex) in columns" :key="thIndex" :width="th.width" :align="th.align">
            <text :style="[th.headerStyle]">{{ th.title }}</text>
          </uni-th>
        </uni-tr>
        <uni-tr v-for="(tr, trIndex) in innerData" :key="trIndex">
          <uni-td v-for="(td, tdIndex) in columns" :key="tdIndex" :align="td.align">
            <text :style="[td.cellStyle]">{{ formatData(tr[td.key], td) }}</text>
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>
    <view class="pagination-box" v-if="pagination">
      <uni-pagination
        v-model="innerPage.page"
        :page-size="innerPage.size"
        :total="innterTotal"
        :show-icon="pagination.showIcon || true"
        :prev-text="pagination.prevText"
        :next-text="pagination.nextText"
        @change="pageChange" />
    </view>
  </scroll-view>
</template>

<script>
import props from './props.js'
export default {
  name: 'GTbale',
  mixins: [props],
  data() {
    return {
      innerLoading: false,
      innterTotal: 0,
      innerPage: {
        page: 1,
        size: 10
      },
      innerData: []
    }
  },
  watch: {
    loading: {
      handler(val) {
        this.innerLoading = val
      },
      deep: true
    },
    pagination: {
      handler(val) {
        this.innterTotal = val.total
        this.innerPage = {
          page: val.page,
          size: val.size
        }
      },
      deep: true,
      immediate: true
    },
    data: {
      handler(val) {
        if (this.localPaging) {
          this.pageChange({
            current: 1
          })
        } else {
          this.innerData = val
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    formatData(val, col) {
      const {
        type,
        symbol,
        precision,
        round,
        format,
        dict,
        nameKey,
        valueKey
      } = col
      let res = val
      switch (type) {
        case 'number':
          res = this.$g.fmfs.number(val, precision, round)
          break
        case 'price':
          res = this.$g.fmfs.price(val, symbol, precision, round)
          break
        case 'date':
          res = this.$g.fmfs.date(val, format)
          break
        case 'dict':
          res = this.$g.fmfs.dict(val, dict, nameKey, valueKey)
          break
        case 'array':
          res = this.$g.fmfs.array(val, valueKey, symbol)
          break
      }
      return res
    },
    pageChange(e) {
      if (this.localPaging) {
        this.innerLoading = true
        this.innerPage.pageNum = e.current
        const startIndex = (e.current - 1) * this.innerPage.size
        const endIndex = startIndex + this.innerPage.size - 1
        this.innerData = this.data.slice(startIndex, endIndex)
        this.innerLoading = false
      } else {
        this.$emit('pageChange', {
          page: e.current,
          size: this.innerPage.size
        })
      }
    },
    selectionChange(e) {
      this.$emit('selectionChange', e)
    },
    selectionAll() {
      this.$refs.gTable.selectionAll()
    },
    toggleRowSelection(row, selected) {
      this.$refs.gTable.toggleRowSelection(row, selected)
    },
    clearSelection() {
      this.$refs.gTable.clearSelection()
    },
    toggleAllSelection() {
      this.$refs.gTable.toggleAllSelection()
    }
  }
}
</script>

<style scoped>
	.pagination-box {
		margin-top: 10px;
	}
</style>
