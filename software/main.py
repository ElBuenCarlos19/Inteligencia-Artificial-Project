import flet as ft
import requests
import json
from datetime import datetime

class IAApp:
    def __init__(self):
        self.usuario_logueado = None
        self.usuario_id = None
        self.api_base_url = "http://localhost:3000/api"
        
    def main(self, page: ft.Page):
        page.title = "Sistema IA - 4 Variables"
        page.theme_mode = ft.ThemeMode.LIGHT
        page.window_width = 500
        page.window_height = 700
        page.window_resizable = False
        page.vertical_alignment = ft.MainAxisAlignment.CENTER
        page.horizontal_alignment = ft.CrossAxisAlignment.CENTER
        
        # Variables para los switches
        self.x1_switch = ft.Switch(label="Variable X1", value=False)
        self.x2_switch = ft.Switch(label="Variable X2", value=False)
        self.x3_switch = ft.Switch(label="Variable X3", value=False)
        self.x4_switch = ft.Switch(label="Variable X4", value=False)
        
        # Campos de login
        self.usuario_field = ft.TextField(
            label="Usuario",
            width=300,
            prefix_icon=ft.Icons.PERSON
        )
        self.password_field = ft.TextField(
            label="Contraseña",
            password=True,
            can_reveal_password=True,
            width=300,
            prefix_icon=ft.Icons.LOCK
        )
        
        self.status_text = ft.Text("", color=ft.Colors.RED)
        
        # Historial
        self.historial_list = ft.ListView(
            expand=True,
            spacing=10,
            padding=ft.padding.all(20),
            height=200
        )
        
        self.show_login_screen(page)
    
    def show_login_screen(self, page):
        page.clean()
        
        login_container = ft.Container(
            content=ft.Column([
                ft.Text(
                    "🤖 Sistema de IA",
                    size=32,
                    weight=ft.FontWeight.BOLD,
                    color=ft.Colors.BLUE_700
                ),
                ft.Text(
                    "Control de 4 Variables",
                    size=16,
                    color=ft.Colors.GREY_700
                ),
                ft.Divider(height=30),
                self.usuario_field,
                self.password_field,
                ft.ElevatedButton(
                    "Iniciar Sesión",
                    on_click=lambda _: self.login(page),
                    width=300,
                    height=50,
                    style=ft.ButtonStyle(
                        color=ft.Colors.WHITE,
                        bgcolor=ft.Colors.BLUE_700
                    )
                ),
                ft.TextButton(
                    "¿No tienes cuenta? Registrarse",
                    on_click=lambda _: self.show_register_screen(page)
                ),
                self.status_text
            ],
            alignment=ft.MainAxisAlignment.CENTER,
            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
            spacing=20
            ),
            padding=ft.padding.all(40),
            bgcolor=ft.Colors.WHITE,
            border_radius=15,
            shadow=ft.BoxShadow(
                spread_radius=1,
                blur_radius=15,
                color=ft.Colors.BLUE_GREY_300,
                offset=ft.Offset(0, 0),
                blur_style=ft.ShadowBlurStyle.OUTER,
            )
        )
        
        page.add(login_container)
        page.update()
    
    def show_register_screen(self, page):
        page.clean()
        
        register_container = ft.Container(
            content=ft.Column([
                ft.Text(
                    "📝 Registro",
                    size=28,
                    weight=ft.FontWeight.BOLD,
                    color=ft.Colors.GREEN_700
                ),
                ft.Divider(height=20),
                self.usuario_field,
                self.password_field,
                ft.ElevatedButton(
                    "Registrarse",
                    on_click=lambda _: self.register(page),
                    width=300,
                    height=50,
                    style=ft.ButtonStyle(
                        color=ft.Colors.WHITE,
                        bgcolor=ft.Colors.GREEN_700
                    )
                ),
                ft.TextButton(
                    "¿Ya tienes cuenta? Iniciar Sesión",
                    on_click=lambda _: self.show_login_screen(page)
                ),
                self.status_text
            ],
            alignment=ft.MainAxisAlignment.CENTER,
            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
            spacing=20
            ),
            padding=ft.padding.all(40),
            bgcolor=ft.Colors.WHITE,
            border_radius=15,
            shadow=ft.BoxShadow(
                spread_radius=1,
                blur_radius=15,
                color=ft.Colors.BLUE_GREY_300,
                offset=ft.Offset(0, 0),
                blur_style=ft.ShadowBlurStyle.OUTER,
            )
        )
        
        page.add(register_container)
        page.update()
    
    def show_main_screen(self, page):
        page.clean()
        
        # Header
        header = ft.Container(
            content=ft.Row([
                ft.Text(
                    f"👋 Bienvenido, {self.usuario_logueado}",
                    size=20,
                    weight=ft.FontWeight.BOLD,
                    color=ft.Colors.WHITE
                ),
                ft.IconButton(
                    icon=ft.Icons.LOGOUT,
                    icon_color=ft.Colors.WHITE,
                    on_click=lambda _: self.logout(page),
                    tooltip="Cerrar Sesión"
                )
            ],
            alignment=ft.MainAxisAlignment.SPACE_BETWEEN
            ),
            bgcolor=ft.Colors.BLUE_700,
            padding=ft.padding.all(20),
            border_radius=10
        )
        
        # Panel de variables
        variables_panel = ft.Container(
            content=ft.Column([
                ft.Text(
                    "🎛️ Control de Variables",
                    size=18,
                    weight=ft.FontWeight.BOLD,
                    color=ft.Colors.BLUE_700
                ),
                ft.Divider(),
                self.x1_switch,
                self.x2_switch,
                self.x3_switch,
                self.x4_switch,
                ft.Divider(),
                ft.ElevatedButton(
                    "💾 Almacenar Estado",
                    on_click=lambda _: self.almacenar_estado(page),
                    width=250,
                    height=50,
                    style=ft.ButtonStyle(
                        color=ft.Colors.WHITE,
                        bgcolor=ft.Colors.GREEN_600
                    )
                ),
                self.status_text
            ],
            spacing=15
            ),
            padding=ft.padding.all(20),
            bgcolor=ft.Colors.GREY_50,
            border_radius=10,
            border=ft.border.all(1, ft.Colors.GREY_300)
        )
        
        # Panel de historial
        historial_panel = ft.Container(
            content=ft.Column([
                ft.Row([
                    ft.Text(
                        "📊 Historial",
                        size=18,
                        weight=ft.FontWeight.BOLD,
                        color=ft.Colors.BLUE_700
                    ),
                    ft.IconButton(
                        icon=ft.Icons.REFRESH,
                        on_click=lambda _: self.cargar_historial(page),
                        tooltip="Actualizar"
                    )
                ],
                alignment=ft.MainAxisAlignment.SPACE_BETWEEN
                ),
                ft.Divider(),
                self.historial_list
            ],
            spacing=10
            ),
            padding=ft.padding.all(20),
            bgcolor=ft.Colors.GREY_50,
            border_radius=10,
            border=ft.border.all(1, ft.Colors.GREY_300),
            height=250
        )
        
        main_content = ft.Column([
            header,
            variables_panel,
            historial_panel
        ],
        spacing=20
        )
        
        page.add(
            ft.Container(
                content=main_content,
                padding=ft.padding.all(20)
            )
        )
        
        # Cargar historial inicial
        self.cargar_historial(page)
        page.update()
    
    def login(self, page):
        try:
            response = requests.post(f"{self.api_base_url}/usuario/login", json={
                "usuario": self.usuario_field.value,
                "password": self.password_field.value
            })
            
            data = response.json()
            
            if data["success"]:
                self.usuario_logueado = data["data"]["usuario"]
                self.usuario_id = data["data"]["id"]
                self.status_text.value = ""
                self.show_main_screen(page)
            else:
                self.status_text.value = data["message"]
                self.status_text.color = ft.Colors.RED
                page.update()
                
        except Exception as e:
            self.status_text.value = f"Error de conexión: {str(e)}"
            self.status_text.color = ft.Colors.RED
            page.update()
    
    def register(self, page):
        try:
            response = requests.post(f"{self.api_base_url}/usuario/registrar", json={
                "usuario": self.usuario_field.value,
                "password": self.password_field.value
            })
            
            data = response.json()
            
            if data["success"]:
                self.status_text.value = "Usuario registrado exitosamente"
                self.status_text.color = ft.Colors.GREEN
                page.update()
                # Esperar un momento y mostrar login
                page.after(2000, lambda: self.show_login_screen(page))
            else:
                self.status_text.value = data["message"]
                self.status_text.color = ft.Colors.RED
                page.update()
                
        except Exception as e:
            self.status_text.value = f"Error de conexión: {str(e)}"
            self.status_text.color = ft.Colors.RED
            page.update()
    
    def almacenar_estado(self, page):
        try:
            response = requests.post(f"{self.api_base_url}/historial/almacenar", json={
                "usuario_id": self.usuario_id,
                "x1": self.x1_switch.value,
                "x2": self.x2_switch.value,
                "x3": self.x3_switch.value,
                "x4": self.x4_switch.value
            })
            
            data = response.json()
            
            if data["success"]:
                self.status_text.value = "✅ Estado almacenado correctamente"
                self.status_text.color = ft.Colors.GREEN
                self.cargar_historial(page)
            else:
                self.status_text.value = data["message"]
                self.status_text.color = ft.Colors.RED
            
            page.update()
                
        except Exception as e:
            self.status_text.value = f"Error de conexión: {str(e)}"
            self.status_text.color = ft.Colors.RED
            page.update()
    
    def cargar_historial(self, page):
        try:
            response = requests.get(f"{self.api_base_url}/historial/usuario/{self.usuario_id}")
            data = response.json()
            
            if data["success"]:
                self.historial_list.controls.clear()
                
                for registro in data["data"]:
                    fecha = datetime.fromisoformat(registro["fecha_registro"].replace('Z', '+00:00'))
                    fecha_str = fecha.strftime("%d/%m/%Y %H:%M")
                    
                    combinacion = f"{'✅' if registro['x1'] else '❌'} {'✅' if registro['x2'] else '❌'} {'✅' if registro['x3'] else '❌'} {'✅' if registro['x4'] else '❌'}"
                    
                    item = ft.Container(
                        content=ft.Row([
                            ft.Column([
                                ft.Text(f"X1:{registro['x1']} X2:{registro['x2']} X3:{registro['x3']} X4:{registro['x4']}", 
                                        weight=ft.FontWeight.BOLD),
                                ft.Text(fecha_str, size=12, color=ft.Colors.GREY_600)
                            ], spacing=5),
                            ft.Text(combinacion, size=16)
                        ],
                        alignment=ft.MainAxisAlignment.SPACE_BETWEEN
                        ),
                        padding=ft.padding.all(10),
                        bgcolor=ft.Colors.WHITE,
                        border_radius=5,
                        border=ft.border.all(1, ft.Colors.GREY_300)
                    )
                    
                    self.historial_list.controls.append(item)
                
                page.update()
                
        except Exception as e:
            print(f"Error al cargar historial: {str(e)}")
    
    def logout(self, page):
        self.usuario_logueado = None
        self.usuario_id = None
        self.usuario_field.value = ""
        self.password_field.value = ""
        self.status_text.value = ""
        self.show_login_screen(page)

def main(page: ft.Page):
    app = IAApp()
    app.main(page)

if __name__ == "__main__":
    ft.app(target=main)
