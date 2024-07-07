<template>
  <nav>
    <router-link to="/" class="nav-link">Data List</router-link> 
    <router-link to="/dataform" class="nav-link">Data Form</router-link>
  </nav>
  <router-view/>
</template>

<script setup>
</script>

<style >
body {
  font-family: Arial, sans-serif;
  background-color: #222831;
  color: rgb(0, 0, 0);
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #000000;
  border-radius: 60px;
  margin-bottom: 30px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}

.nav-link {
  padding: 10px;
  margin: 0 10px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: bolder;
  border-bottom: 2px solid transparent;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #ff0000;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff0000;
  transform: scaleX(0); 
  transition: transform 0.3s ease;
}

.nav-link:hover::before {
  transform: scaleX(1); 
}
</style>
