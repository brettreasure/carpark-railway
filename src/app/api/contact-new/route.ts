// Save contact message to database
  const { error: insertError } = await supabaseAdmin
    .from('contact_messages')
    .insert({
      name,
      email,
      message,
    });

  if (insertError) {
    console.error('Insert error:', insertError);
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
