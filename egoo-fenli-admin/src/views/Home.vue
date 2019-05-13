<template>
  <div class="home">
    <div class="nav">
      <div class="nav-start">
        <a :href="homeLink" class="logo" title="Egoo cli">
          <img src="../assets/img/egoo_cli.svg">
          <span><em>Egoo CLI</em><i>分离地址管理</i></span>
        </a>
      </div>
      <div class="nav-end">
        <Input search placeholder="Enter something..." />
        <Button icon="md-add" type="primary" @click="add">添加</Button>
        <Dropdown placement="bottom-end">
          <span>
            <img src="../assets/img/github-circle-black-transparent.svg" alt="">
          </span>
          <DropdownMenu slot="list">
            <DropdownItem>{{user.name}}</DropdownItem>
            <DropdownItem @on-click="logout">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="table">
      <Table highlight-row :columns="columns" :data="list" @on-current-change="select"></Table>
    </div>
    <div class="paging">
      <Page :total="total" :current="current" :page-size="size" size="small" show-total @on-change="changePage" />
    </div>

    <Modal v-model="isEdit" @on-ok="ok" @on-cancel="cancel">
      <Form :model="form" label-position="left">
        <FormItem label="游戏名称">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="别名">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="分离地址">
          <Input v-model="form.path" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  compontes: {
    //
  },
  data () {
    return {
      homeLink: '//github.com/nicewell',
      isEdit: false,
      defaultForm: {
        name: '',
        alias: '',
        path: ''
      },
      form: null,
      columns: [
        {
          title: '游戏名称',
          key: 'name'
        },
        {
          title: '别名',
          key: 'alias'
        },
        {
          title: '分离地址',
          key: 'path'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      list: [],
      total: 0,
      current: 1,
      size: 10,
      editId: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.clearState()
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapActions(['removeToken']),
    logout () {
      console.log('---------')
      this.removeToken()
      this.$router.push('/login')
    },
    add () {
      this.isEdit = true
    },
    async delete (row) {
      let id = row._id
      let res = await this.$api.address.delAddress(id)
      let { code, msg } = { ...res.data }
      this.$Message.info(msg)
      if (code !== 200) { return }
      this.getData()
    },
    select (currentRow) {
      console.log({ currentRow })
    },
    edit (row) {
      this.isEdit = true
      this.form = { ...row }
      this.editId = row._id
    },
    changePage (current) {
      this.current = current
      this.getData()
    },
    async addAddress () {
      let form = Object.assign({}, this.form, { alias: this.form.alias.split(',') })
      let res = await this.$api.address.addAddress(form)
      let { code } = { ...res.data }
      if (code !== 200) { return }
      this.getData()
      this.clearState()
    },
    async editAddress (id) {
      let form = Object.assign({}, this.form, { alias: this.form.alias.split(',') })
      let res = await this.$api.address.editAddress(id, form)
      let { code } = { ...res.data }
      if (code !== 200) { return }
      this.getData()
      this.clearState()
    },
    ok () {
      if (this.editId) {
        this.editAddress(this.editId)
      } else {
        this.addAddress()
      }
    },
    cancel () {
      console.log('Clicked cancel')
    },
    clearState () {
      this.form = Object.assign({}, this.defaultForm)
      this.isEdit = false
      this.editId = null
      this.current = 1
    },
    async getData () {
      let res = await this.$api.address.getAddress({ size: this.size, page: this.current })
      let list = res.data.data.list
      let { total } = { ...res.data.data.pagination }
      this.total = total
      list.forEach(item => {
        item.alias = item.alias.join(',')
      })
      this.list = list
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
}
.nav {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 1px;
    box-shadow: 0 2px 1px #cccccc;
  }
  &-start,
  &-end {
    position: relative;
    height: 100%;
  }
  .logo {
    position: relative;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    & > img {
      width: auto;
      height: 100%;
    }
    & > span {
      white-space: nowrap;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      align-items: flex-start;
    }
  }
  &-end {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    & > * {
      margin-right: 10px;
    }
  }
}
.table {
  margin-bottom: 20px;
}
.paging {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  padding: 0 30px;
}
</style>
