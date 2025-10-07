@extends('superadmin.layout')

@section('content')
<h2>Tenant Details</h2>

<div class="card">
    <div class="card-body">
        <h4>{{ $tenant->name }}</h4>
        <p><strong>Domain:</strong> {{ $tenant->domain }}</p>
        <p><strong>Admin Email:</strong> {{ $adminEmail }}</p>
        <p><strong>Created At:</strong> {{ $tenant->created_at->format('d M Y H:i') }}</p>
    </div>
</div>

<a href="{{ route('superadmin.tenants.index') }}" class="btn btn-secondary mt-3">Back</a>
@endsection
