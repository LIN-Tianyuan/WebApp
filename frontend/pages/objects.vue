<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="text-gradient">Object Management</h1>
      <button
        class="btn btn-primary btn-lg mt-3"
        @click="toggleForm"
      >
        {{ showForm ? "Cancel" : "Add New Object" }}
      </button>
    </div>

    <div v-if="showForm" class="card p-4 shadow-sm mb-4">
      <form @submit.prevent="submitObject" class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="name" class="form-label">Object Name</label>
          <input
            type="text"
            id="name"
            v-model="newObject.name"
            class="form-control"
            placeholder="Enter object name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Object Description</label>
          <input
            type="text"
            id="description"
            v-model="newObject.description"
            class="form-control"
            placeholder="Enter object description"
            required
          />
        </div>
        <button type="submit" class="btn btn-success">
          {{ isEditing ? "Update Object" : "Submit Object" }}
        </button>
      </form>
    </div>

    <div v-if="objects.length" class="row g-4">
      <div
        v-for="object in objects"
        :key="object._id"
        class="col-md-4"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-gradient">{{ object.name }}</h5>
            <p class="card-text text-muted">
              {{ object.description }}
            </p>
          </div>
          <div class="card-footer bg-transparent border-top-0 d-flex justify-content-between">
            <button
              class="btn btn-warning btn-sm"
              @click="editObject(object)"
            >
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteObject(object._id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-4">
      <p class="text-muted fs-5">No objects available.</p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      objects: [],
      newObject: { name: '', description: '' },
      showForm: false,
      isEditing: false, // Determine if it's in edit mode
      editingObjectId: null, // ID of the current editing object
    };
  },
  methods: {
    async fetchObjects() {
      try {
        const response = await this.$axios.get('/objects');
        this.objects = response.data;
      } catch (error) {
        console.error('Failed to fetch objects:', error);
      }
    },
    async submitObject() {
      try {
        if (this.isEditing) {
          const response = await this.$axios.put(
            `/objects/${this.editingObjectId}`,
            this.newObject
          );
          const updatedObject = response.data;
          const index = this.objects.findIndex(
            (object) => object._id === updatedObject._id
          );
          if (index !== -1) {
            this.objects.splice(index, 1, updatedObject);
          }
        } else {
          const response = await this.$axios.post('/objects', this.newObject);
          this.objects.push(response.data);
        }
        this.resetForm();
        this.showForm = false;
      } catch (error) {
        console.error('Failed to create or update object:', error);
      }
    },
    editObject(object) {
      this.newObject = { ...object };
      this.showForm = true;
      this.isEditing = true;
      this.editingObjectId = object._id;
    },
    async deleteObject(id) {
      try {
        await this.$axios.delete(`/objects/${id}`);
        this.objects = this.objects.filter((object) => object._id !== id);
      } catch (error) {
        console.error('Failed to delete object:', error);
      }
    },
    toggleForm() {
      if (this.isEditing) {
        this.resetForm();
      }
      this.showForm = !this.showForm;
    },
    resetForm() {
      this.newObject = { name: '', description: '' };
      this.isEditing = false;
      this.editingObjectId = null;
    },
  },
  mounted() {
    this.fetchObjects();
  },
};
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #ff6464, #fc1f5f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card {
  border-radius: 15px;
}

.btn-primary {
  background: linear-gradient(to right, #f7b42c, #fc1f5f);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(to right, #fc1f5f, #f7b42c);
}

.btn-warning {
  color: #fff;
}

.btn-warning:hover {
  background-color: #e3a617;
}

.btn-danger:hover {
  background-color: #d9534f;
}
</style>
