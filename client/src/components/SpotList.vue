<template>
  <ApolloQuery :query="require('../graphql/Spots.gql')">
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result">
        <table>
          <thead>
            <tr>
              <th colSpan="4">Spot</th>
              <th colSpan="1">Image</th>
              <th colSpan="12">Containers</th>
            </tr>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Content type</th>
              <th v-for="type in types" :key="type">{{ type }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="s of data.spots">
              <tr :key="s._id">
                <td>{{ s._id }}</td>
                <td>{{ s.name }}</td>
                <td>{{ s.lat }}</td>
                <td>{{ s.lng }}</td>
                <td>{{ s.img.contentType }}</td>
                <td v-for="c in s.containers" :key="c._id">{{ c.count }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">Loading..</div>
    </template>
  </ApolloQuery>
</template>

<script>
import ContainerType from "../enums/ContainerType";

export default {
  name: "SpotList",
  data() {
    return {
      types: [],
    };
  },

  mounted() {
    Object.keys(ContainerType).map((key) => {
      this.types = [...this.types, key];
    });
  },
};
</script>

<style lang="scss" scoped>
table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  tr {
    &:nth-child(even) {
      background-color: #f2f2f2;
    }

    &:hover {
      background-color: #ddd;
    }
  }

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4caf50;
    color: white;
  }
}
</style>
