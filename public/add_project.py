import json
import os
import re
import streamlit as st
from datetime import datetime


def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)


def save_json(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)


def get_next_id(data):
    max_id = 0
    for section in data:
        for project in section['projects']:
            max_id = max(max_id, project['id'])
    return max_id + 1


def convert_to_hyphenated(string):
    """
    Converts a space-separated string to a hyphen-separated string,
    removing special characters except hyphens.
    
    Args:
        string (str): The input space-separated string.
        
    Returns:
        str: The transformed hyphen-separated string.
    """
    # Remove special characters except spaces and hyphens
    cleaned_string = re.sub(r'[^\w\s-]', '', string)
    # Replace spaces with hyphens
    hyphenated_string = re.sub(r'\s+', '-', cleaned_string.strip())
    return hyphenated_string


def html_template(project_name, project_github="https://github.com/aryansingh920/", project_author="Aryan Singh"):
    html_template = f'''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>{project_name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            background-color: #f8f9fa;
            color: #333;


        }}

        header {{
            background: rgba(0, 17, 40, 0.86);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5.1px);
            -webkit-backdrop-filter: blur(5.1px);
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }}

        header h1 {{
            margin: 0;
            font-size: 2.5em;
        }}

        header p {{
            font-size: 1.2em;
        }}

        section {{
            padding: 20px;
            margin: 20px 10px;

            background: rgba(255, 255, 255, 0.35);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5.6px);
            -webkit-backdrop-filter: blur(5.6px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }}

        section h2 {{
            color: #007bff;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }}

        section p,
        ul,
        ol {{
            margin-bottom: 15px;
        }}

        iframe {{
            display: block;
            margin: 20px auto;
            width: 100%;
            height: 500px;
            border: none;
            border-radius: 8px;
        }}

        footer {{
            text-align: center;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
        }}

        footer a {{
            color: #fff;
            text-decoration: underline;
        }}

        .highlight {{
            background-color: #f0f8ff;
            border-left: 5px solid #007bff;
            padding: 10px 15px;
            margin: 15px 0;
            font-style: italic;
        }}

        .quote {{
            font-size: 1.2em;
            font-weight: bold;
            color: #555;
            margin: 20px 0;
            text-align: center;
        }}
    </style>
    </head>

    <body>
        <footer>
            <p>Developed by {project_author}. Explore the full implementation on <a href="{project_github}" target="_blank">GitHub</a>.</p>
        </footer>
    </body>
    </html>
    '''
    return html_template


def create_project_directory(project_path, project_name, project_github, project_author="Aryan Singh"):
    """
    Creates a new directory with the given project path and adds an index.html file.

    Args:
        project_path (str): Path of the directory to be created.
    """
    try:
        os.makedirs(project_path, exist_ok=True)
        index_file_path = os.path.join(project_path, "index.html")
        with open(index_file_path, 'w') as index_file:
            index_file.write(
                html_template(project_name, project_github, project_author))
    except Exception as e:
        st.error(f"Failed to create project directory: {e}")

def main():
    st.title("Project Management JSON Updater")

    file_path = "public/projects.json"  # Replace with your JSON file path

    # Load existing JSON data
    try:
        data = load_json(file_path)
    except FileNotFoundError:
        st.error("JSON file not found!")
        return

    headings = [section['heading'] for section in data]

    # Select or create a heading
    heading_choice = st.selectbox(
        "Select an existing heading or create a new one:", ["Create New"] + headings)

    if heading_choice == "Create New":
        new_heading = st.text_input("Enter the new heading name:")
        if new_heading:
            heading_choice = new_heading
            if new_heading not in headings:
                data.append({"heading": new_heading, "projects": []})

    if not heading_choice:
        st.warning("Please select or create a heading.")
        return

    # Add a new project
    st.subheader("Add a New Project")
    project_name = st.text_input("Project Name:")
    project_path = st.text_input(
        "Project Path:", value=f"data/project{get_next_id(data)}")
    project_author = st.text_input(
        "Author (Default: Aryan Singh):", value="Aryan Singh")
    project_github = st.text_input(
        "GitHub Repository:", value=""
    )

    if st.button("Add Project"):
        if not project_name or not project_path:
            st.error("Project name and path are required.")
        else:
            current_time = datetime.now()
            new_project = {
                "id": get_next_id(data),
                "name": convert_to_hyphenated(project_name),
                "path": project_path,
                "author": project_author,
                "addedOn": {
                    "time": current_time.strftime("%H:%M"),
                    "date": current_time.strftime("%d/%m/%Y")
                }
            }

            # Add to the selected heading
            for section in data:
                if section['heading'] == heading_choice:
                    section['projects'].append(new_project)
                    break
            else:  # If it's a new heading
                data.append({"heading": heading_choice,
                            "projects": [new_project]})

            # Create project directory and add index.html
            create_project_directory(project_path=f"{project_path}",
                                     project_name=project_name,
                                     project_github=project_github)

            # Save the updated JSON
            save_json(data, file_path)
            st.success("Project added successfully!")

    # Display the updated JSON
    st.subheader("Updated JSON Content")
    st.json(data)


if __name__ == "__main__":
    main()
