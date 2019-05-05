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
        <span>
          <img src="../assets/img/github-circle-black-transparent.svg" alt="">
        </span>
      </div>
    </div>
    <div class="table">
      <Table highlight-row :columns="columns" :data="list" @on-current-change="select"></Table>
    </div>
    <div class="paging">
      <Page :total="40" size="small" show-total @on-change="changePage" />
    </div>

    <Modal v-model="isEdit" @on-ok="ok" @on-cancel="cancel">
      <Form :model="hold" label-position="left">
        <FormItem label="游戏名称">
          <Input v-model="hold.name" />
        </FormItem>
        <FormItem label="别名">
          <Input v-model="hold.alias" />
        </FormItem>
        <FormItem label="分离地址">
          <Input v-model="hold.path" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'Home',
  compontes: {
    //
  },
  data () {
    return {
      homeLink: '//github.com/nicewell',
      isEdit: false,
      hold: {
        name: '',
        alias: '',
        path: ''
      },
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
                    this.edit(params.index)
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
                    this.delete(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      list: [
        {
          name: 'John Brown',
          alias: 18,
          path: 'New,York,Lake,Park'
        }
      ]
    }
  },
  computed: {
    //
  },
  methods: {
    add () {
      this.isEdit = true
      console.log('add')
    },
    delete (index) {
      console.log(index)
      this.$Message.info('This is a info tip')
    },
    select (currentRow) {
      console.log({ currentRow })
    },
    edit (currentRow) {
      this.isEdit = true
      console.log({ currentRow })
    },
    changePage (page) {
      console.log(page)
    },
    ok () {
      console.log('Clicked ok')
    },
    cancel () {
      console.log('Clicked cancel')
    }
  },
  async mounted () {
    let res = await this.$api.address.getAddress()
    let list = res.data.data.list
    list.forEach(item => {
      item.alias = item.alias.join(',')
    })
    this.list = list
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
