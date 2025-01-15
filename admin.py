import mysql.connector
import tkinter as tk
from tkinter import messagebox

# Initialize global variables for username and password
current_username = ""
current_password = ""

def connect_db(username, password):
    return mysql.connector.connect(
        host="localhost",  # Change to your host if needed
        user=username,  # Use the login username
        password=password,  # Use the login password
        database="culinary_dispatch_system"  # The database name
    )

# Function to verify login credentials
def login():
    global current_username, current_password
    username = entry_user.get()
    password = entry_password.get()
    
    # Store the username and password after successful login
    db = connect_db(username, password)
    cursor = db.cursor()
    
    query = "SELECT COUNT(*) FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    result = cursor.fetchone()

    if result[0] > 0:
        messagebox.showinfo("Success", "Login successful!")
        current_username = username  # Store username globally
        current_password = password  # Store password globally
        db_operations_window()  # Open operations window after login
    else:
        messagebox.showerror("Error", "Invalid username or password")
    
    cursor.close()
    db.close()

# Function to open the operations window after login
def db_operations_window():
    login_window.destroy()

    operation_window = tk.Tk()
    operation_window.title("Admin Operations")
    operation_window.geometry("600x400")  # Window size
    operation_window.config(bg="#FFDC73")  # Background color

    # Add restaurant operation
    def add_restaurant():
        name = entry_restaurant_name.get()
        address = entry_restaurant_address.get()
        phone = entry_restaurant_phone.get()
        culinary_type = entry_restaurant_culinary_type.get()

        db = connect_db(current_username, current_password)  # Use stored credentials
        cursor = db.cursor()
        query = "INSERT INTO Restaurant (Name, Address, Phone, CulinaryType) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (name, address, phone, culinary_type))
        db.commit()

        messagebox.showinfo("Success", "Restaurant added successfully!")
        cursor.close()
        db.close()

    # Update restaurant operation
    def update_restaurant():
        restaurant_id = entry_restaurant_id.get()
        name = entry_restaurant_name.get()
        address = entry_restaurant_address.get()
        phone = entry_restaurant_phone.get()
        culinary_type = entry_restaurant_culinary_type.get()

        db = connect_db(current_username, current_password)  # Use stored credentials
        cursor = db.cursor()
        query = "UPDATE Restaurant SET Name = %s, Address = %s, Phone = %s, CulinaryType = %s WHERE RestaurantID = %s"
        cursor.execute(query, (name, address, phone, culinary_type, restaurant_id))
        db.commit()

        messagebox.showinfo("Success", "Restaurant updated successfully!")
        cursor.close()
        db.close()

    # Delete restaurant operation
    def delete_restaurant():
        restaurant_id = entry_restaurant_id.get()

        db = connect_db(current_username, current_password)  # Use stored credentials
        cursor = db.cursor()
        query = "DELETE FROM Restaurant WHERE RestaurantID = %s"
        cursor.execute(query, (restaurant_id,))
        db.commit()

        messagebox.showinfo("Success", "Restaurant deleted successfully!")
        cursor.close()
        db.close()

    # GUI for adding/updating/deleting restaurant
    tk.Label(operation_window, text="Restaurant ID (for update/delete):", font=("Arial", 14), bg="#FFDC73").grid(row=0, column=0, padx=10, pady=10)
    entry_restaurant_id = tk.Entry(operation_window, font=("Arial", 12))
    entry_restaurant_id.grid(row=0, column=1, padx=10, pady=10)

    tk.Label(operation_window, text="Restaurant Name:", font=("Arial", 14), bg="#FFDC73").grid(row=1, column=0, padx=10, pady=10)
    entry_restaurant_name = tk.Entry(operation_window, font=("Arial", 12))
    entry_restaurant_name.grid(row=1, column=1, padx=10, pady=10)

    tk.Label(operation_window, text="Restaurant Address:", font=("Arial", 14), bg="#FFDC73").grid(row=2, column=0, padx=10, pady=10)
    entry_restaurant_address = tk.Entry(operation_window, font=("Arial", 12))
    entry_restaurant_address.grid(row=2, column=1, padx=10, pady=10)

    tk.Label(operation_window, text="Restaurant Phone:", font=("Arial", 14), bg="#FFDC73").grid(row=3, column=0, padx=10, pady=10)
    entry_restaurant_phone = tk.Entry(operation_window, font=("Arial", 12))
    entry_restaurant_phone.grid(row=3, column=1, padx=10, pady=10)

    tk.Label(operation_window, text="Culinary Type:", font=("Arial", 14), bg="#FFDC73").grid(row=4, column=0, padx=10, pady=10)
    entry_restaurant_culinary_type = tk.Entry(operation_window, font=("Arial", 12))
    entry_restaurant_culinary_type.grid(row=4, column=1, padx=10, pady=10)

    # Buttons with improved appearance
    button_style = {"font": ("Arial", 12), "bg": "#4CAF50", "fg": "white", "padx": 20, "pady": 10}

    tk.Button(operation_window, text="Add Restaurant", command=add_restaurant, **button_style).grid(row=5, column=0, padx=10, pady=20)
    tk.Button(operation_window, text="Update Restaurant", command=update_restaurant, **button_style).grid(row=5, column=1, padx=10, pady=20)
    tk.Button(operation_window, text="Delete Restaurant", command=delete_restaurant, **button_style).grid(row=5, column=2, padx=10, pady=20)

    operation_window.mainloop()

# Function to create the login window
def create_login_window():
    global entry_user, entry_password

    login_window = tk.Tk()
    login_window.title("Login")
    login_window.geometry("400x300")  # Window size
    login_window.config(bg="#FFABAB")  # Background color

    tk.Label(login_window, text="Username:", font=("Arial", 16), bg="#FFABAB").grid(row=0, column=0, padx=10, pady=20)
    entry_user = tk.Entry(login_window, font=("Arial", 14))
    entry_user.grid(row=0, column=1, padx=10, pady=20)

    tk.Label(login_window, text="Password:", font=("Arial", 16), bg="#FFABAB").grid(row=1, column=0, padx=10, pady=20)
    entry_password = tk.Entry(login_window, show="*", font=("Arial", 14))
    entry_password.grid(row=1, column=1, padx=10, pady=20)

    button_style = {"font": ("Arial", 14), "bg": "#4CAF50", "fg": "white", "padx": 20, "pady": 10}
    tk.Button(login_window, text="Login", command=login, **button_style).grid(row=2, column=0, columnspan=2, pady=30)

    login_window.mainloop()

# Start the login window
create_login_window()
