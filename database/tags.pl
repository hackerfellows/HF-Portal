#!/usr/bin/perl
#
#
#USAGE: run, pipe to file.
#Replace ,; with ;

use strict;
use warnings;

my $numFellows = 22;
my $numCompanies = 28;
my $numTags = 30;
my $tagRelations =5;


for(my $fellow=1; $fellow<=$numFellows; $fellow++){
	print "INSERT INTO fellow_tags(fellow_id, tag_id) VALUES";
	for(my $tagRel=0; $tagRel<$tagRelations; $tagRel++){
		my $tag = int(rand($numTags))+1;
		print "\n\t($fellow, $tag),";
	}
	print ";\n\n";
}


for(my $company=1; $company<=$numCompanies; $company++){
	print "INSERT INTO company_tags(company_id, tag_id) VALUES";
	for(my $tagRel=0; $tagRel<$tagRelations; $tagRel++){
		my $tag = int(rand($numTags))+1;
		print "\n\t($company, $tag),";
	}
	print ";\n\n";
}
