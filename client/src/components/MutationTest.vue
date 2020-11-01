<template>
  <div>
    <input type="text" v-model="message" />
    <button @click="testMutation">SEND MESSAGE</button>
  </div>
</template>

<script>
export default {
  name: "MutationTest",
  data() {
    return {
      message: "message!",
    };
  },

  methods: {
    testMutation() {
      /*var jsonSpot = JSON.parse(JSON.stringify(this.spot));
      console.log(jsonSpot);*/

      // We save the user input in case of an error
      const newMessage = this.message;
      // We clear it early to give the UI a snappy feel
      //this.newSpot = "";

      //console.log(this.spot);
      this.$apollo
        .mutate({
          // Query
          mutation: require("../graphql/AddTest.gql"),
          // Parameters
          variables: {
            message: newMessage,
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data }) => {
            console.log("update");
            console.log(data);
            // Read the data from our cache for this query.
            /*const data = store.readQuery({ query: TAGS_QUERY });
            // Add our tag from the mutation to the end
            data.tags.push(addTag);
            // Write our data back to the cache.
            store.writeQuery({ query: TAGS_QUERY, data });*/
          },
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
          /*optimisticResponse: {
            __typename: "Mutation",
            addSpot: {
              __typename: "Spot",
              id: -1,
              label: newSpot,
            },
          },*/
        })
        .then((data) => {
          // Result
          console.log("RESULT:");
          console.log(data);
        })
        .catch((error) => {
          // Error
          console.log("ERROR:");
          console.log(error);
          // We restore the initial user input
          //this.newTag = newTag;
        });
    },
  },
};
</script>
