<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteTutorials">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorials">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("tutorial");

export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  methods: {
    ...mapActions(["getTutorial", "updateTutorial", "deleteTutorial"]),
    async getTutorials(id) {
      console.log(id);
      const data = await this.getTutorial(id);
      if (data.id) {
        this.currentTutorial = data;
      }
    },

    async updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };

      const data2 = await this.updateTutorial(data);
      if (data2) this.message = "The tutorial was updated successfully!";
    },

    async updateTutorials() {
      const data = await this.updateTutorial(this.currentTutorial);
      if (data) this.message = "The tutorial was updated successfully!";
    },

    async deleteTutorials() {
      const data = await this.deleteTutorial(this.currentTutorial.id);
      if (data) this.$router.push({ name: "tutorials" });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorials(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>