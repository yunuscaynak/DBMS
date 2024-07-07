<template>
  <div class="form-container">
    <h2>Veri Ekle</h2>
    <form @submit.prevent="submitForm" class="styled-form">
      <div class="form-group">
        <label for="name">Ad:</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>

      <div class="form-group">
        <label for="age">Yaş:</label>
        <input type="number" id="age" v-model.number="formData.age" required />
      </div>

      <div class="form-group">
        <label for="jobs">Meslek:</label>
        <input type="text" id="jobs" v-model="formData.jobs" required />
      </div>

      <div class="form-group">
        <label for="phone">Telefon:</label>
        <input type="text" id="phone" v-model="formData.phone" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>

      <button type="submit" class="submit-button">Ekle</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore/lite';
import { useRouter } from 'vue-router';
const router = useRouter();

const formData = ref({
  name: "",
  age: null,
  jobs: "",
  phone: "",
  email: "",
});

const submitForm = async () => {
  try {
    await addDoc(collection(db, 'people'), formData.value);
    alert('Veri başarıyla eklendi!');
    
    formData.value = {
      name: "",
      age: null,
      jobs: "",
      phone: "",
      email: "",
    };
    
    router.push('./');

  } catch (e) {
    console.error('Veri ekleme hatası: ', e);
  }
};
</script>

<style scoped>
.form-container {
  margin-top: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #B6BBC4;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Gölgelendirme efekti */
}

h2 {
  text-align: center;
  color: #333;
}

.styled-form {
  display: flex;
  flex-direction: column;
  max-width: 750px; /* Örnek olarak 400px genişlik belirleyebiliriz */
  margin: 0 auto; /* Formu ortalamak için */
}


.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff; /* Odaklandığında sınırların rengini değiştirme */
}

.submit-button {
  padding: 12px 24px; /* Biraz daha büyük boyut */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: center; /* Butonu formun ortasına hizala */
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
