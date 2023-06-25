#!/bin/bash
# Pruebas manuales

# Inicio de sesión
#curl -X POST http://nutrivets.campanita.xyz/sesion -H "Content-Type: application/x-www-form-urlencoded" -d "usuario=giovani@nutrivets.com&contra=giovani" -v

# Inicio de sesión fallido
#curl -X POST http://nutrivets.campanita.xyz/sesion -H "Content-Type: application/x-www-form-urlencoded" -d "usuario=gio@nutrivets.com&contra=giovani" -v