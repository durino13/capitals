<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AdminLTE 2 | Fixed Layout</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style.css')}}">
</head>
<body class="hold-transition skin-blue fixed sidebar-mini">

<!-- Site wrapper -->
<div class="wrapper">

    @include('header')

    <div class="content-wrapper">
        <section class="content">
            @yield('content')
        </section>
    </div>

</div>

<script src="{{ asset('assets/js/bundle.js') }}"></script>
</body>
</html>
