@extends('layout')

@section('content')


<section class="content-header">
    <h1>
        Quiz game
        <small>Learn world capitals in this simple quiz game</small>
    </h1>
</section>

<!-- Main content -->
<section class="content">
    <div class="callout callout-info">
        <h4>Question!</h4>

        <p>What is the capital city of Slovakia?</p>
    </div>
    <!-- Default box -->
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">Options</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                    <i class="fa fa-minus"></i></button>
                <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                    <i class="fa fa-times"></i></button>
            </div>
        </div>
        <div class="box-body">
            Select the answer
        </div>
    </div>

</section>

@endsection