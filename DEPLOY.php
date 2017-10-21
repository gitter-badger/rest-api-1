<?php
header('Content-Type: application/json');

$commands = [
    "git status",
    "git fetch",
    "git pull ;rsync -vazrh -e "ssh ". 192.168.1.29:/var/www/htmltodoAPI",
];

$output = [];
foreach ($commands AS $command) {
    $tmp = shell_exec($command);
    $output[] = $tmp;
}
echo json_encode($output,JSON_UNESCAPED_SLASHES);


'rsync -vrah . ssh -C pi@192.168.1.29:/var/www/html/todoAPI 2>&1'
echo json_encode(str_replace('\n',''),JSON_UNESCAPED_SLASHES);