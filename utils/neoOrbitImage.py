import matplotlib.pyplot as plt

def plot_orbit(orbital_data):
    print(orbital_data)


    # Extract data from orbit_data
    semi_major_axis = [item['semi_major_axis'] for item in orbital_data]
    inclination = [item['inclination'] for item in orbital_data]

    # Create the plot
    plt.figure(figsize=(10, 5))
    plt.scatter(semi_major_axis, inclination, c='blue', label='Orbit', s=20)

    # Set labels and title
    plt.xlabel('Semi-Major Axis (AU)')
    plt.ylabel('Inclination (deg)')
    plt.title('Orbit Plot')

    # Set axis limits based on the data
    plt.xlim(min(semi_major_axis), max(semi_major_axis))
    plt.ylim(0, 180)  # Assuming inclination ranges from 0 to 180 degrees

    # Show the legend
    plt.legend()

    # Show the plot
    plt.grid(True)
    plt.show()
