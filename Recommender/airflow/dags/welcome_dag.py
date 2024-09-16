from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.utils.dates import days_ago
from datetime import datetime
import requests
import papermill as pm

def run_notebook():
    pm.execute_notebook(
        '/opt/airflow/dags/RetrivalModel_tfrs.ipynb',  # Path inside the container
        '/opt/airflow/dags/RetrivalOutput.ipynb'     # Output file inside the container

    )

def print_welcome():
    print('Welcome to Airflow!')

def print_date():
    print('Today is {}'.format(datetime.today().date()))

def print_random_quote():
    # response = requests.get('https://api.quotable.io/random')
    # quote = response.json()['content']
    print('Quote of the day: "{Hello}"')

dag = DAG(
    'welcome_dag',
    default_args={'start_date': days_ago(1)},
    schedule_interval='30 17 * * *',
    catchup=False
)



print_welcome_task = PythonOperator(
    task_id='print_welcome',
    python_callable=print_welcome,
    dag=dag
)



print_date_task = PythonOperator(

    task_id='print_date',

    python_callable=print_date,

    dag=dag

)
# Define the task
run_notebook_task = PythonOperator(
    task_id='run_jupyter_notebook',
    python_callable=run_notebook,
    dag=dag
)



print_random_quote = PythonOperator(

    task_id='print_random_quote',

    python_callable=print_random_quote,

    dag=dag

)



# Set the dependencies between the tasks

print_welcome_task >> run_notebook_task