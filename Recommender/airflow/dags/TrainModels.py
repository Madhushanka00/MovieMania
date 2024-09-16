from airflow import DAG
from airflow.operators.python_operator import PythonOperator
# from airflow.operators.bash_operator import BashOperator
from airflow.utils.dates import days_ago
from datetime import datetime
import requests
import papermill as pm


def run_notebook():
    # pm.execute_notebook(
    #     '/opt/airflow/dags/RetrivalModel_tfrs.ipynb',  # Path inside the container
    #     '/opt/airflow/dags/RetrivalOutput.ipynb'     # Output file inside the container
    # )
    pm.execute_notebook(
        '/opt/airflow/dags/notebook.ipynb',  # Path inside the container
        '/opt/airflow/dags/output.ipynb'     # Output file inside the container

    )

def print_Start():
    print('Training pipeline started')

def print_End():
    print('Training pipeline ended')

dag = DAG(
    'TrainModels_dag',
    default_args={'start_date': days_ago(1)},
    schedule_interval='30 17 * * *',
    catchup=False
)

print_Start_task = PythonOperator(
    task_id='pipeline started',
    python_callable=print_Start,
    dag=dag
)

run_notebook_task = PythonOperator(
    task_id='run_jupyter_notebook',
    python_callable=run_notebook,
    dag=dag
)

print_End_task = PythonOperator(
    task_id='pipeline ended',
    python_callable=print_End,
    dag=dag
)

print_Start_task >> run_notebook_task >> print_End_task

