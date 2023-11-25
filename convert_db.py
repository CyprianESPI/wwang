import csv
import json

csv_filename = 'Database/All_Data.csv'  # Replace with your CSV filename

# Read the CSV file with a semicolon delimiter and specify field names
with open(csv_filename, 'r') as csv_file:
    field_names = ['Num', 'Name', 'Name_EN', 'Barcode', 'Price', 'Stock', 'Price1', 'Discount', 'TVA', 'Field10', 'Field11']
    csv_reader = csv.reader(csv_file, delimiter=';')

    # Convert CSV data to a list of dictionaries
    data = [dict(zip(field_names, row)) for row in csv_reader]

# Convert the data to JSON
json_data = json.dumps(data, indent=4)

# Write JSON data to a file
with open('data.json', 'w') as json_file:
    json_file.write(json_data)

print("Conversion successful. JSON file created.")
