import pickle

with open('../MLmodels/Exports/movie_list.pkl', 'rb') as file:
    # Backend\Assistant.ipynb
    # MLmodels\Exports
    new_df = pickle.load(file)

print(new_df.head())
