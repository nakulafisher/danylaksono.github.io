<?php
     echo "HI! Ajax arrived here and this code it's being executed!";
	$nama      = $_POST["nama"];
    $alamat   = $_POST["alamat"];
    $pesan    = $_POST["inputPesan"];
    
    if(isset($nama)){
        $data = array(
            "nama"     => $nama,
            "alamat"  => $alamat,
            "pesan"   => $pesan
            
        );
        echo json_encode($data);
    }
?>