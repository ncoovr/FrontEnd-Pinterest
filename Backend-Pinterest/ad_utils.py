import subprocess

SERVER_IP = "172.16.0.2"
# Ruta a tu llave privada en Windows 11 para no usar contraseñas en texto plano
LLAVE_PRIVADA = "C:\\Users\\Server\\.ssh\\id_ed25519" 

def crear_usuario_ad(correo: str, nombre: str, password: str) -> bool:
    username = correo.split("@")[0]
    ou_path = "OU=Ugllery_APP_Users,OU=Usuarios,OU=UgalleryCompany,DC=ugallery,DC=ecu"
    upn_domain = "ugallery.ecu" 


    powershell_script = (
        f"powershell -Command \""
        f"Import-Module ActiveDirectory; "
        f"$existing = Get-ADUser -Filter 'SamAccountName -eq \\'{username}\\''; "
        f"if ($existing) {{ Write-Output 'EXISTE'; exit 0 }}; "
        f"try {{ "
        f"  $securePassword = ConvertTo-SecureString '{password}' -AsPlainText -Force; "
        f"  New-ADUser -Name '{nombre}' "
        f"             -SamAccountName '{username}' "
        f"             -UserPrincipalName '{username}@{upn_domain}' "
        f"             -Path '{ou_path}' "
        f"             -AccountPassword $securePassword "
        f"             -Enabled $true; "
        f"  Write-Output 'CREADO'; "
        f"}} catch {{ "
        f"  Write-Output 'ERROR'; "
        f"}}\""
    )
    
 
    comando_ssh = ["ssh", "-i", LLAVE_PRIVADA, f"Administrador@{SERVER_IP}", powershell_script]
    
    try:
        process = subprocess.run(
            comando_ssh,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        resultado = process.stdout.strip()
        if "CREADO" in resultado:
            return True
        elif "EXISTE" in resultado:
            return False
        return False
    except Exception as e:
        print(f"[AD ERROR] Error remoto SSH al ejecutar script de creación: {str(e)}")
        return False


def verificar_login_ad(correo: str, password: str) -> bool:
    username = correo.split("@")[0]
    domain = "ugallery.ecu" 

  
    powershell_script = (
        f"powershell -Command \""
        f"try {{ "
        f"  $auth = New-Object System.DirectoryServices.DirectoryEntry('LDAP://{domain}', '{username}', '{password}'); "
        f"  if ($auth.NativeGuid) {{ "
        f"      Write-Output 'TRUE'; "
        f"  }} else {{ "
        f"      Write-Output 'FALSE'; "
        f"  }} "
        f"}} catch {{ "
        f"  Write-Output 'FALSE'; "
        f"}}\""
    )
    
    comando_ssh = ["ssh", "-i", LLAVE_PRIVADA, f"Administrador@{SERVER_IP}", powershell_script]
    
    try:
        process = subprocess.run(
            comando_ssh,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        resultado = process.stdout.strip()
        return "TRUE" in resultado
    except Exception as e:
        print(f"[AD ERROR] Error remoto SSH al verificar login: {str(e)}")
        return False