<template>
  <div class="list-container">
    <h1>Veri Listesi</h1>
    <ul>
      <li v-for="person in people" :key="person.id">
        <span><strong>Ad: </strong> {{ person.name }}</span>
        <span><strong>Yaş: </strong> {{ person.age }}</span>
        <span><strong>İş: </strong> {{ person.jobs }}</span>
        <span><strong>Telefon: </strong> {{ person.phone }}</span>
        <span><strong>Email: </strong> {{ person.email }}</span>
        <button @click="deleteData(person.id)" class="delete-button">Sil</button>
        <button @click="editData(person)" class="fix-button">Düzenle</button>
      </li>
    </ul>

    <!-- form duzenleme -->
    <div v-show="isEditing" class="form-container" :class="{ active: isEditing }">
      <h2>Düzenle: {{ editingPerson?.name }}</h2>
      <form @submit.prevent="updateData">
        <label>Ad:</label>
        <input v-model="editForm.name" required>
        <label>Yaş:</label>
        <input v-model="editForm.age" required>
        <label>İş:</label>
        <input v-model="editForm.jobs">
        <label>Telefon:</label>
        <input v-model="editForm.phone">
        <label>Email:</label>
        <input v-model="editForm.email" type="email" required>
        <button type="submit" style="background-color: green;">Kaydet</button>
        <button type="button" @click="cancelEdit">İptal</button>
      </form>
    </div>
    <!-- end of form -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore/lite";

const people = ref([]);
const editForm = ref({
  name: "",
  age: "",
  jobs: "",
  phone: "",
  email: "",
});
let editingPerson = ref(null);
const isEditing = ref(false);

onMounted(async () => {
  try {
    const fbData = collection(db, "people");
    const fbDocs = await getDocs(fbData);
    people.value = fbDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Veriler alınırken bir hata oluştu:", error.message);
  }
});

const deleteData = async (id) => {
  try {
    await deleteDoc(doc(db, "people", id));
    people.value = people.value.filter(person => person.id !== id);
    console.log("Veri başarıyla silindi.");
  } catch (error) {
    console.error("Veri silinirken bir hata oluştu:", error.message);
  }
};

const editData = (person) => {
  editingPerson.value = person;
  editForm.value = {
    name: person.name,
    age: person.age,
    jobs: person.jobs || "",
    phone: person.phone || "",
    email: person.email,
  };
  isEditing.value = true;
};

const updateData = async () => {
  if (!editingPerson.value) {
    console.error("Düzenlenecek bir kişi seçilmedi.");
    return;
  }

  try {
    const personRef = doc(db, "people", editingPerson.value.id);
    await updateDoc(personRef, {
      name: editForm.value.name,
      age: editForm.value.age,
      jobs: editForm.value.jobs,
      phone: editForm.value.phone,
      email: editForm.value.email,
    });

    const index = people.value.findIndex(person => person.id === editingPerson.value.id);
    people.value[index] = {
      id: editingPerson.value.id,
      ...editForm.value,
    };
    console.log("Veri başarıyla güncellendi.");
    cancelEdit();
  } catch (error) {
    console.error("Veri güncellenirken bir hata oluştu:", error.message);
  }
};

const cancelEdit = () => {
  editingPerson.value = null;
  editForm.value = {
    name: "",
    age: "",
    jobs: "",
    phone: "",
    email: "",
  };
  isEditing.value = false;
};
</script>

<style scoped>
h1 {
  color: white;
  text-align: center;
  margin-top: 20px;
}

.list-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-container li {
  text-decoration: none;
  list-style: none;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #B6BBC4;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.list-container span {
  display: flex;
  padding: 10px;
}

.list-container strong {
  color: #007bff;
  margin-right: 10px;
}

.delete-button {
  width: 100%;
  padding: 10px 0px;
  background-color: #990000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px auto;
  text-align: center;
}

.delete-button:hover {
  background-color: #8b3e33;
}

.fix-button {
  width: 100%;
  padding: 10px 0px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px auto;
  text-align: center;
}

fix-button:hover {
  background-color: #7a9fc6;
}

/* Form duzenleme */
.form-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  z-index: 1000;
}

.form-container.active {
  transform: translateX(0);
}

.form-container h2 {
  margin-top: 0;
}

.form-container form {
  display: flex;
  flex-direction: column;
}

.form-container label {
  margin-top: 10px;
}

.form-container input {
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-container button {
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-container button:hover {
  background-color: #0056b3;
}
</style>
