# SE Multitool

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A collection of essential calculators and tools for the game Space Engineers, designed to assist with ship design and engineering calculations.

![SE Multitool Screenshot](https://i.imgur.com/W2H43lX.png)
## About The Project

This project was created to provide Space Engineers players with a simple, all-in-one web tool for the most common calculations needed when designing ships and stations. Whether you're trying to escape a planet's gravity, planning a long-distance jump, or figuring out a safe landing, this multitool has you covered.

It is designed to be fully self-contained and can be run offline, making it a reliable companion for your engineering endeavors.

## Features

This tool includes several modules accessible through a simple tab-based interface:

* **Thruster Requirements Calculator:**
    * Calculates the exact number of each thruster type required to lift a ship of a given mass in any gravity environment.
    * Includes a detailed cargo mass calculator: specify container counts, inventory multiplier, and the specific ore, ingot, or component to get an accurate total ship mass.

* **Thruster Efficiencies Analyzer:**
    * Visualizes the performance of your ship's specific thruster setup (Ion, Hydrogen, and Atmospheric) as it ascends from a planet's surface.
    * Generates a graph comparing your ship's total thrust vs. the force of gravity at different altitudes, helping you identify performance gaps.

* **Parachute Calculator:**
    * Determines the precise number of parachutes needed to land a grid safely at a desired terminal velocity.

* **Jump Drive Calculator:**
    * Quickly calculates the maximum jump distance in kilometers for a ship based on its total mass and the number of jump drives installed.

* **Blueprint Parser:**
    * Allows you to drag and drop a `.sbc` blueprint file directly onto the page.
    * Parses the file and provides a complete, itemized list of all blocks and their quantities used in the blueprint.

* **Thruster Damage Reference:**
    * A quick-reference table for the damage range (in blocks) for every thruster type on both small and large grids.

## How to Use

The easiest way to use the tool is to visit the live version hosted on GitHub Pages:

**[SE Multitool](https://scryptolog1st.github.io/SE-Multitool/)**

Simply navigate between the different calculators using the tabs at the top. The inputs are designed to update the results in real-time.

### Running Offline

This tool can be run completely offline from your local machine.

1.  Clone or download this repository to your computer.
2.  Open the `index.html` file in any modern web browser.

## License

This project is licensed under the GNU General Public License v3.0. See the `LICENSE` file for more details.

## Disclaimer

Space Engineers™ is a trademark of Keen Software House. This project is a fan-made tool and is not affiliated with or endorsed by Keen Software House.
