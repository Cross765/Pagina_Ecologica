# qr_generator.py
import qrcode

def generar_qr(url: str, archivo_salida: str = "qr.png", escala: int = 10):
    # añade esquema si el usuario olvidó ponerlo
    if not url.startswith(("http://", "https://")):
        url = "http://" + url

    # crear QR
    qr = qrcode.QRCode(
        version=None,  # tamaño automático
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=escala,
        border=4,
        
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(archivo_salida)
    print(f"QR guardado en: {archivo_salida}")

if __name__ == "__main__":
    # ejemplo de uso
    generar_qr("https://pagina-ecologica.onrender.com", "TSDS_GP.png")