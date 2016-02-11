# HashCode Challenge ASCII Painting Generator

Gets an ASCII painting input and generates the necessary paint commands for Google's paint specialized painting machine.

## Getting started

Clone this project and installs its dependencies

```
npm install
```

## Generate painting commands

To generate a painting command out file execute:

```
./painting.js generate -i ascii_image.in -o ascii_image.out
```

### Options:

** -i, --input **

Input file patch

** -o, --output **

Output file path where generator will create the commands file.

** -s, --strategy **

Strategy to be applied. Default: hlines (Horizontal Lines)


## Paint a command out file

Executes a commands output file and generates the ASCII image.

```
./painting.js paint -i ascii_image.out -r 14 -c 80
```

## Strategies

### hlines - Horizontal Lines

Generates a PRINT_LINE command for all the lines within each row.

```
./painting.js generate -i ascii_image.in -s hlines -o ascii_image.out
```

