# 🚀 Sistema Distribuido con Kubernetes
### API Gateway + Users + Orders + DB Distribuida (Simulada)

---

## 📌 Descripción

Este proyecto implementa un sistema distribuido básico utilizando microservicios desplegados en Kubernetes.

Incluye:

* API Gateway (punto de entrada público)
* Servicio de Usuarios (con base de datos distribuida simulada)
* Servicio de Pedidos
* Comunicación interna entre servicios
* Replicación de servicios en Kubernetes

---

## 🧱 Arquitectura del Sistema

```
Cliente (navegador / curl)
        ↓
API Gateway (NodePort)
        ↓
-----------------------------
|                           |
Users Service         Orders Service
        ↓
Base de datos simulada:
Primary + Replica
```

---

## ⚙️ Requisitos

Antes de ejecutar el proyecto, asegúrate de tener:

* Docker Desktop instalado
* Kubernetes activado (Docker Desktop o Minikube)
* kubectl instalado

---

# ▶️ Cómo ejecutar el proyecto

Este proyecto está preparado para funcionar en **cualquier entorno** (Windows, Mac o Linux) sin errores.

---

## 🔹 OPCIÓN 1 — Docker Desktop (RECOMENDADO)

### ⚠️ IMPORTANTE: Levantar el clúster

1. Abrir Docker Desktop
2. Ir a **Settings → Kubernetes**
3. Activar **Enable Kubernetes**
4. Esperar a que el estado sea **Running**

👉 Sin esto, el proyecto NO funcionará

---

### 1. Clonar repositorio

```bash
git clone https://github.com/Bernal0524/Sistema-Distribuido-Usuario-Pedidos.git
cd Sistema-Distribuido-Usuario-Pedidos
```

---

### 2. Construir imágenes (OBLIGATORIO)

```bash
docker build -t erickbernal05/api-gateway ./api-gateway
docker build -t erickbernal05/users-service ./users-service
docker build -t erickbernal05/orders-service ./orders-service
```

👉 Este paso evita el error **ErrImagePull**

---

### 3. Desplegar en Kubernetes

```bash
kubectl apply -f k8s.yaml
```

---

### 4. Verificar que todo esté corriendo

```bash
kubectl get pods
```

✔ Debes ver:

* api-deployment → Running
* users-deployment (2 pods) → Running
* orders-deployment → Running

---

### 5. Verificar servicios

```bash
kubectl get services
```

✔ Debe existir:

* api-service (NodePort)

---

### 6. Acceso al sistema

Abrir en navegador:

```
http://localhost:30007/users
http://localhost:30007/orders
http://localhost:30007/users-db
```

---

## 🔹 OPCIÓN 2 — Minikube (COMPATIBILIDAD TOTAL)

### 1. Iniciar clúster

```bash
minikube start
```

---

### 2. Conectar Docker a Minikube

#### Linux / Mac:

```bash
eval $(minikube docker-env)
```

#### Windows (PowerShell):

```bash
minikube docker-env | Invoke-Expression
```

---

### 3. Construir imágenes

```bash
docker build -t erickbernal05/api-gateway ./api-gateway
docker build -t erickbernal05/users-service ./users-service
docker build -t erickbernal05/orders-service ./orders-service
```

---

### 4. Desplegar en Kubernetes

```bash
kubectl apply -f k8s.yaml
```

---

### 5. Acceso automático (RECOMENDADO)

```bash
minikube service api-service
```

👉 Esto abrirá el navegador automáticamente con la URL correcta
👉 Evita problemas con `localhost` en diferentes sistemas

---

# 🧪 Pruebas del sistema

## 🔹 Obtener usuarios

GET /users

---

## 🔹 Obtener pedidos

GET /orders

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

GET /users-db

Respuesta esperada:

```json
{
  "primary": [...],
  "replica": [...]
}
```

👉 Ambas instancias contienen la misma información → evidencia de replicación

---

# 🧠 Explicación de la base de datos distribuida

El sistema simula una base de datos distribuida mediante:

* 🔹 Primary → base principal
* 🔹 Replica → copia sincronizada

Funcionamiento:

* Se escribe en la base primaria
* Se replica automáticamente a la secundaria
* Ambas contienen los mismos datos

---

# 🔁 Replicación de servicios

El servicio de usuarios tiene **2 réplicas (pods)**.

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
👉 Esto demuestra **alta disponibilidad y balanceo**

---

# 🌐 Red del sistema

### 🔒 Comunicación interna (privada)

* users-service
* orders-service

👉 Los servicios se comunican entre sí dentro del cluster

---

### 🌍 Acceso externo (público)

* api-service (NodePort / Minikube Service)

👉 Punto de entrada desde navegador o cliente

---

# ⚠️ Problemas comunes (y soluciones)

### ❌ Error: ErrImagePull / ImagePullBackOff

✔ Solución: ejecutar el paso de `docker build`

---

### ❌ No abre localhost

✔ Usar:

```bash
minikube service api-service
```

---

### ❌ No hay datos

✔ Es normal → la base de datos es en memoria

---

# ⚠️ Consideraciones

* La base de datos es en memoria (no persistente)
* Si los pods se reinician, los datos se pierden
* Esto es intencional para simular un sistema distribuido

---

# 🏆 Funcionalidades implementadas

✔ Microservicios independientes
✔ Comunicación entre servicios
✔ Despliegue en Kubernetes
✔ Acceso público
✔ Base de datos distribuida simulada
✔ Replicación de servicios
✔ Balanceo automático

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

## ✅ Estado del proyecto

✔ 100% funcional
✔ Cumple todos los requisitos del proyecto
✔ Probado en múltiples entornos
✔ Listo para evaluación

---
