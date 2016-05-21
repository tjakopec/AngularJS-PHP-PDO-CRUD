<?php

$imena = file("ime.txt");

echo $imena[array_rand($imena)];
