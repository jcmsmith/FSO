# [Part 12 - Containers](https://fullstackopen.com/en/part12/)

---

## Core Concepts

- Docker images and containers
- Docker commands such as exec, compose, etc
- Bind Mounts and Volumes
- Communication between containers
- Production and development environments in containers
- Multi-stage builds
- Serving static files, and reverse-proxying

---

## Libraries/Tools Learned

- Docker and Docker Hub
- NGinx
- Busybox
- Redis
- WSL & Ubuntu

---

## Projects

### Part12 Containers Applications

Script-answers contains the code executed (recorded by the script command) as I was following the exercises given, such as installing node and authenticating with mongoDB inside running containers. The other folders contain [starter projects](https://github.com/fullstack-hy2020/part12-containers-applications) that were modified as per instructions.

### Bloglist Docker

Yet another version of the bloglist app, this time configured to run both the frontend and backend using docker-compose. Includes a dev environment that allows for hot-reloading and automatic nodemon restarts, and a production environment.

---

## Notes

Reverse-proxying was the most difficult part of this whole part, for me. I spend most of these 35 hours just trying to get Nginx to work properly, and was never really able to. I ended up forgoing it in favor of just manually proxying the requests, not very scalable but I solved the problem!

---

## Total hours: 35

---

![Certificate of completion](https://imgur.com/4fUkjTI.png)

[Home](https://github.com/jcmsmith/Full-Stack-open)
