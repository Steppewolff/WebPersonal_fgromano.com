import os
import sys
import logging
from flask import Flask, request, render_template, redirect, url_for
from datetime import datetime
from bdd import Datos

project_root = os.path.dirname(os.path.realpath('__file__'))
template_path = os.path.join(project_root, 'app/templates')
static_path = os.path.join(project_root, 'app/static')

#Bloque para configurar el logger de Python, en el directorio Top: Python_debug.log
logger = logging.getLogger('Python_Log')
logger.setLevel(logging.DEBUG)
fh = logging.FileHandler('Python_debug.log')
fh.setLevel(logging.DEBUG)
logger.addHandler(fh)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh.setFormatter(formatter)
logger.addHandler(fh)
# logger.debug('Debug Message')
# logger.info('Info Message')
# logger.warning('Warning')
# logger.error('Error Occured')
# logger.critical('Critical Error')

#app = Flask(__name__, template_folder=template_path, static_folder=static_path)
app = Flask(__name__)

@app.route('/')
def index():
    # Definim les variables
    nomUsuari="Fernando Gomez"
    horaServidor= datetime.now().time()    
    # Passam les variables al template "index.html" que esta a la carpeta 'templates'
    return render_template('index.html',nom=nomUsuari,hora=horaServidor)

@app.route('/curriculum')
def curriculum():
    '''Página donde incluir información laboral, resumen y enlaces a información y trabajos (instituciones, supervisores, artículos,...)
       Hacer como un CV pero interactivo, enriquecido y atractivo visualmente
    '''
    # Read dates from DB and convert them to a list of integers
    years = []
    dates = []
    dates = Datos.cargarAnosCv()
    for date in dates:
        year = date['fecha_final'].year
        if year not in years:
            years.append(year)

    return render_template('curriculum.html', len = len(years), years=sorted(years, reverse = True))

@app.route('/portfolio')
def portfolio():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    return render_template('portfolio.html')

@app.route('/hobbies')
def hobbies():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    return render_template('hobbies.html')

@app.route('/enlaces')
def enlaces():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    return render_template('enlaces.html')
    
@app.route('/recomendaciones')
def recomendaciones():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    return render_template('recomendaciones.html')

@app.route('/redes')
def redes():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    return render_template('redessociales.html')

@app.route('/mapaweb')
def mapaweb():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    return render_template('mapaweb.html')

@app.route('/login')
def login():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def datos():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    if request.method == 'POST':
        user = request.form['user_field']
        pwd = request.form['pwd_field']

@app.route('/contacto')
def contacto():
    '''Espacio para poner descripción de las apps que cree y un enlace a github, heroku o el repositorio donde estén guardadas
       No solo app grandes, puedo ir subiendo pequeñas apps que vaya creando
    '''
    return render_template('contacto.html')

@app.route('/contacto', methods=['GET', 'POST'])
def formulario():
    # recuperar desde el formulario la variable comentario
    if request.method == 'POST':
        comentario = request.form['comments']

#Lanzamiento del programa (en servidor local/en servidor remoto), se deja comentada la que no se use
#if __name__ == "__main__":
#    port = int(os.environ.get("PORT", 5100))
#    app.run(host = '0.0.0.0', port = port, debug = True)

application = app
