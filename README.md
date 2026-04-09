# 🚀 Sistema Distribuido con Kubernetes

## API Gateway + Users + Orders + DB Distribuida (Simulada)

---

# 📌 Descripción

Este proyecto implementa un **sistema distribuido básico** utilizando microservicios desplegados en Kubernetes.

Incluye:

* API Gateway (punto de entrada público)
* Servicio de Usuarios (con base de datos distribuida simulada)
* Servicio de Pedidos
* Comunicación interna entre servicios
* Replicación de servicios en Kubernetes

---

# 🧱 Arquitectura del Sistema

```
Cliente (navegador / curl)
        ↓
API Gateway (NodePort:30007)
        ↓
-----------------------------
|                           |
Users Service         Orders Service
        ↓
Base de datos simulada:
Primary + Replica
```

---

# ⚙️ Requisitos

Antes de ejecutar el proyecto, asegúrate de tener:

* Docker Desktop instalado
* Kubernetes activado en Docker Desktop
* kubectl instalado

---

# ▶️ Cómo ejecutar el proyecto

### 1. Abrir terminal en la raíz del proyecto

```bash
cd proyecto-k8s
```

---

### 2. Aplicar configuración de Kubernetes

```bash
kubectl apply -f k8s.yaml
```

---

### 3. Verificar que todo esté corriendo

```bash
kubectl get pods
```

✔ Debes ver algo como:

* api-deployment → Running
* users-deployment (2 pods) → Running
* orders-deployment → Running

---

### 4. Verificar servicios

```bash
kubectl get services
```

✔ Debe existir:

* api-service (NodePort 30007)

---

# 🌐 Acceso al sistema

Abrir en el navegador:

```
http://localhost:30007/users
http://localhost:30007/orders
http://localhost:30007/users-db
```

---

# 🧪 Pruebas del sistema

---

## 🔹 Obtener usuarios

```
GET /users
```

Devuelve lista de usuarios.

---

## 🔹 Obtener pedidos

```
GET /orders
```

Devuelve pedidos.

---

## 🔹 Crear usuario (POST)

En PowerShell:

```bash
curl -Method POST http://localhost:30007/users `
-Headers @{"Content-Type"="application/json"} `
-Body '{"id":2,"name":"Juan"}' `
-UseBasicParsing
```

---

## 🔹 Ver base de datos distribuida

```
GET /users-db
```

Respuesta:

```json
{
  "primary": [...],
  "replica": [...]
}
```

---

# 🧠 Explicación de la base de datos distribuida

El sistema simula una base de datos distribuida mediante:

* 🔹 Primary → base principal
* 🔹 Replica → copia sincronizada

Funcionamiento:

1. Se escribe en la base primaria
2. Se replica automáticamente a la secundaria
3. Ambas contienen los mismos datos

---

# 🔁 Replicación de servicios

El servicio de usuarios tiene **2 réplicas (pods)** en Kubernetes.

Verificar:

```bash
kubectl get pods
```

Eliminar uno:

```bash
kubectl delete pod <nombre-del-pod>
```

👉 Kubernetes lo recrea automáticamente
👉 El sistema sigue funcionando

---

# 🌐 Red del sistema

* Comunicación interna:

  * `users-service`
  * `orders-service`

* Acceso externo:

  * `api-service` (NodePort)

---

# ⚠️ Consideraciones

* La base de datos es en memoria (no persistente)
* Si los pods se reinician, los datos se pierden
* Esto es intencional para simular comportamiento distribuido

---

# 🏆 Funcionalidades implementadas

✔ Microservicios independientes
✔ Comunicación entre servicios
✔ Despliegue en Kubernetes
✔ Acceso público
✔ Base de datos distribuida simulada
✔ Replicación de servicios

---

# 🧪 Comandos útiles

```bash
kubectl get pods
kubectl get services
kubectl delete pods --all
kubectl logs <pod>
```

---

# 🎯 Resultado

Sistema distribuido funcional que demuestra:

* Arquitectura de microservicios
* Comunicación interna en Kubernetes
* Balanceo y replicación
* Simulación de base de datos distribuida

---
