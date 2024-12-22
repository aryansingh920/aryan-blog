import json
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

            # Save the updated JSON
            save_json(data, file_path)
            st.success("Project added successfully!")

    # Display the updated JSON
    st.subheader("Updated JSON Content")
    st.json(data)


if __name__ == "__main__":
    main()
