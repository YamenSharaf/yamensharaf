<template>
  <el-card class="search-box w-100">
    <el-form class="d-flex justify-center">
      <div class="container">
        <div class="row justify-center">
          <div class="col-sm-11 mb-4 mt-2">
            <form @submit.prevent="handleSearchAction">
              <el-input
                size="large"
                placeholder="Your keyword(s)"
                v-model="query">
                <el-button
                  @click="handleSearchAction"
                  slot="append"
                  :loading="loadingResults"
                  icon="el-icon-search"> <span class="d-none d-md-inline-block"> Find Influencers </span> <span class="d-none d-sm-inline-block d-md-none"> Search </span>
                </el-button>
              </el-input>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            Enter in a keyword to find influencers such as
            <a
              class="text-primary"
              @click="makeQuery"
              href="javascript:">vegan</a>
            or
            <a
              class="text-primary"
              @click="makeQuery"
              href="javascript:">fashion</a>.
          </div>
        </div>
        <transition :duration=" { leave: 0 } " name="slideUp">
          <div v-if="searchResults.length > 0" class="row search-results-box mt-3">
            <div class="col-12">
              <el-table
                v-loading="loadingResults"
                max-height="400"
                :data="searchResults"
                stripe
                style="width: 100%">
                <el-table-column
                  label="Influencer">
                  <template slot-scope="scope">
                    <div class="d-flex justify-center">
                      <img class="rounded-circle mr-auto" height="30" :src="scope.row.picture" :alt="scope.row.name">
                      <p class="mb-0 d-inline-flex mx-auto">
                        <strong>
                          {{scope.row.name || truncateHandle}}
                        </strong>
                      </p>

                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="handle"
                  label="Handle"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="followers"
                  label="Followers"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="Email"
                  width="80">
                  <template slot-scope="scope">
                    <el-tooltip content="Please create an account to connect with an influencer">
                      <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="col-12 mt-3">
              <p class="h9 mb-0">
                Create an account now to unlock these emails, websites, followers and more.
              </p>
            </div>
            <div class="col-12 mt-3">
              <router-link :to="{ name: 'FreeTrial' }" >
                <el-button
                  class="p-3"
                  type="primary"
                  size="large">
                  <span class="h8">
                    <i class="fa fa-check-circle h7" aria-hidden="true"></i>
                    Start your free trial
                  </span>
                </el-button>
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'find-influencers',
    data () {
      return {
        loadingResults: false,
        query: '',
        searchResults: []
      }
    },
    methods: {
      makeQuery (event) {
        let query = event.target.textContent
        this.query = query
        this.handleSearchAction()
      },
      async handleSearchAction () {
        this.searchResults = []
        this.loadingResults = true
        try {
          const results = await this.$store.dispatch('fetchSearchResults',{ page: 1, query: this.query })
          const instagramData = results.data.results.map(data => data.instagram[0])
          console.log({instagramData})
          for (let index = 0; index < instagramData.length; index++) {
            setTimeout(() => {
              this.searchResults.push(instagramData[index])
            }, 400 * index);
          }
          // this.searchResults = instagramData
          this.loadingResults = false
        } catch(error) {
          this.$message.error(`Error: ${error} `)
        }
      }
    }
  }
</script>

<style lang="scss">
@import '~vars';

.search-box {
  .el-card {
    width: 100%;
    &__body {
      padding: 10px;
    }
  }

  .el-input {
    font-size: 20px;
  }

  .el-input__inner {
    height: 60px;
  }

  .el-input-group {
    height: 60px;
  }

  .el-input-group__append {
    background: $color-white;

    &:hover {
      background: #eee;
    }
  }
  .search-results-box {
    min-height: 400px;
    .el-table thead {
      border-radius: 5px 5px 0 0 ;
    }
    .el-table th {
      background: $color-primary;
      color: $color-white;
      text-align: center;
    }
    .el-table tr {
      animation: animate-opacity 0.7s;
    }
  }
}

@keyframes animate-opacity {
  0%   { opacity: 0; transform: translateX(-100px) }
  100% { opacity: 1; transform: translateX(0)}
}
</style>
